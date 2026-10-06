/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node worker outside the Next bundle. */
// Isolated structural parser. Never render documents or follow embedded links.
const { parentPort, workerData } = require('node:worker_threads');
const { createHash } = require('node:crypto');
const { unzipSync, strFromU8 } = require('fflate');
const { PDFDocument, PDFDict, PDFName, PDFArray, PDFString, PDFHexString } = require('pdf-lib');
const CFB = require('cfb');
const CV_MAX_BYTES = 5242880;
function sha256(bytes) { return createHash('sha256').update(bytes).digest('hex'); }
const valid = { status: 'valid', code: 'format_valid_v1' };
// Structural validation only, without rendering, macros or external fetches.
async function validateCv(bytes, intent) {
    if (!bytes.length || bytes.length > CV_MAX_BYTES || bytes.length !== intent.size)
        return { status: 'invalid', code: 'size_mismatch' };
    if (sha256(bytes) !== intent.sha256)
        return { status: 'invalid', code: 'hash_mismatch' };
    try {
        if (intent.extension === 'pdf') {
            const header = new TextDecoder('latin1').decode(bytes.slice(0, 16));
            const tail = new TextDecoder('latin1').decode(bytes.slice(-2048));
            if (!/^%PDF-[12]\.\d/.test(header) || !/%%EOF\s*$/.test(tail))
                throw new Error();
            const doc = await PDFDocument.load(bytes, { updateMetadata: false, throwOnInvalidObject: true });
            if (doc.getPageCount() < 1 || doc.getPageCount() > 500)
                throw new Error();
            let active = false;
            const visited = new Set();
            const inspect = (object, depth = 0) => {
                if (depth > 60 || visited.has(object))
                    return;
                visited.add(object);
                if (object instanceof PDFDict)
                    for (const [key, value] of object.entries()) {
                        const name = key.decodeText();
                        if (['JavaScript', 'JS', 'Launch', 'EmbeddedFiles', 'EmbeddedFile', 'RichMedia', 'XFA', 'OpenAction', 'AA'].includes(name))
                            active = true;
                        if (name === 'URI' && (value instanceof PDFString || value instanceof PDFHexString) && !/^(https?:|mailto:|tel:|#)/i.test(value.decodeText()))
                            active = true;
                        inspect(value, depth + 1);
                    }
                if (object instanceof PDFArray)
                    object.asArray().forEach(value => inspect(value, depth + 1));
                if (object instanceof PDFName && ['JavaScript', 'Launch', 'EmbeddedFile', 'RichMedia'].includes(object.decodeText()))
                    active = true;
            };
            doc.context.enumerateIndirectObjects().forEach(([, obj]) => inspect(obj));
            return active ? { status: 'suspicious', code: 'pdf_active_content' } : valid;
        }
        if (intent.extension === 'docx') {
            if (Buffer.from(bytes.slice(0, 4)).toString('hex') !== '504b0304')
                throw new Error();
            let total = 0, entries = 0, active = false;
            const files = unzipSync(bytes, { filter: file => {
                    entries++;
                    total += file.originalSize;
                    if (entries > 1000 || total > 40 * 1024 * 1024 || file.originalSize > 12 * 1024 * 1024 || /(^\/|(^|\/)\.\.(\/|$)|\\)/.test(file.name))
                        throw new Error();
                    if (/(vbaproject|embeddings\/|activex\/|\.exe$|\.dll$|\.js$|\.vbs$)/i.test(file.name))
                        active = true;
                    return /(?:\.xml|\.rels)$/.test(file.name);
                } });
            const types = files['[Content_Types].xml'];
            const document = files['word/document.xml'];
            if (!types || !document || !/wordprocessingml\.document\.main\+xml/.test(strFromU8(types)) || !/<w:document[\s>]/.test(strFromU8(document)))
                throw new Error();
            for (const file of Object.values(files)) {
                const xml = strFromU8(file);
                if (/<!DOCTYPE|<!ENTITY|macroEnabled|\bDDEAUTO\b|\bINCLUDETEXT\b|\bINCLUDEPICTURE\b/i.test(xml))
                    active = true;
                if (/TargetMode\s*=\s*["']External["']/i.test(xml) && /(?:attachedTemplate|oleObject|altChunk)/i.test(xml))
                    active = true;
            }
            return active ? { status: 'suspicious', code: 'docx_active_content' } : valid;
        }
        if (Buffer.from(bytes.slice(0, 8)).toString('hex') !== 'd0cf11e0a1b11ae1' || bytes.length < 512)
            throw new Error();
        const b = Buffer.from(bytes);
        if (![9, 12].includes(b.readUInt16LE(30)) || b.readUInt16LE(32) !== 6 || b.readUInt32LE(44) > bytes.length / 512)
            throw new Error();
        const compound = CFB.read(b, { type: 'buffer' });
        const word = compound.FileIndex.find(item => item.name === 'WordDocument');
        const table = compound.FileIndex.find(item => /^(0|1)Table$/.test(item.name));
        if (!word?.content || !table || word.size < 32 || Buffer.from(word.content).readUInt16LE(0) !== 0xa5ec)
            throw new Error();
        const active = compound.FullPaths.some(path => /(?:VBA|Macros|ObjectPool|Ole10Native)/i.test(path));
        if (Buffer.from(word.content).readUInt16LE(10) & 0x0100)
            return { status: 'suspicious', code: 'encrypted_doc' };
        return active ? { status: 'suspicious', code: 'doc_active_content' } : valid;
    }
    catch {
        return { status: 'invalid', code: 'invalid_structure' };
    }
}
validateCv(new Uint8Array(workerData.bytes), workerData.intent).then(result => parentPort.postMessage(result)).catch(() => parentPort.postMessage({ status: 'invalid', code: 'invalid_structure' }));
