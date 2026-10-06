import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { HttpError } from '../security/body';

export const CV_BUCKET = 'web-cv-private';
export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } as const;
export type CvExtension = keyof typeof CV_TYPES;
export interface FileIntent { extension: CvExtension; size: number; sha256: string }
export function validateFileIntent(value: unknown): FileIntent {
  if (!value || typeof value !== 'object') throw new HttpError(400, 'Indique os dados do ficheiro.');
  const v = value as Record<string, unknown>;
  const extension = typeof v.name === 'string' ? v.name.split('.').at(-1)?.toLowerCase() : v.extension;
  if (!['pdf', 'doc', 'docx'].includes(String(extension))) throw new HttpError(400, 'Utilize um ficheiro PDF, DOC ou DOCX.');
  if (!Number.isSafeInteger(v.size) || Number(v.size) < 1 || Number(v.size) > CV_MAX_BYTES) throw new HttpError(413, 'O CV pode ter até 5 MB.');
  if (typeof v.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(v.sha256)) throw new HttpError(400, 'Identificador do ficheiro inválido.');
  return { extension: extension as CvExtension, size: Number(v.size), sha256: v.sha256 };
}
export function sha256(bytes: Uint8Array | string) { return createHash('sha256').update(bytes).digest('hex'); }
type Validation = { status: 'valid' | 'invalid' | 'suspicious'; code: string };

// Isolate parser faults and time limits from the request and suppress parser output.
export async function validateCv(bytes: Uint8Array, intent: FileIntent): Promise<Validation> {
  if (!bytes.length || bytes.length > CV_MAX_BYTES || bytes.length !== intent.size) return {status:'invalid',code:'size_mismatch'};
  if (sha256(bytes) !== intent.sha256) return {status:'invalid',code:'hash_mismatch'};
  return new Promise(resolve=>{
    const worker = new Worker(path.join(process.cwd(),'src/lib/cv/inspect-worker.cjs'), {
      workerData:{bytes,intent}, resourceLimits:{maxOldGenerationSizeMb:128,stackSizeMb:4}, stdout:true,stderr:true,
    });
    let done=false;
    const finish=(result:Validation)=>{if(done)return;done=true;clearTimeout(timer);void worker.terminate();resolve(result);};
    const timer=setTimeout(()=>finish({status:'suspicious',code:'validation_timeout'}),5000);
    worker.on('message',(result:Validation)=>finish(result));
    worker.on('error',()=>finish({status:'suspicious',code:'validation_error'}));
    worker.on('exit',()=>finish({status:'suspicious',code:'validation_incomplete'}));
    worker.stdout?.resume();worker.stderr?.resume();
  });
}
