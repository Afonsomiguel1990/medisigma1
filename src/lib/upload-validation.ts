import { randomUUID } from 'crypto';

const MAX_CV_FILE_SIZE = 5 * 1024 * 1024;
const CV_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);
const CV_EXTENSIONS = new Set(['pdf', 'doc', 'docx']);

export function validateCvFile(file: File) {
  if (!file || file.size <= 0) return 'Ficheiro CV invalido.';
  if (file.size > MAX_CV_FILE_SIZE) return 'CV demasiado grande. Maximo 5MB.';

  const extension = getFileExtension(file.name);
  if (!extension || !CV_EXTENSIONS.has(extension)) {
    return 'Formato de CV nao permitido. Use PDF, DOC ou DOCX.';
  }

  if (file.type && !CV_MIME_TYPES.has(file.type)) {
    return 'Tipo de ficheiro CV nao permitido. Use PDF, DOC ou DOCX.';
  }

  return null;
}

export function buildStoragePath(prefix: string, originalName: string, ownerName: string) {
  const extension = getFileExtension(originalName) || 'bin';
  const safeOwner = ownerName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'upload';

  return `${prefix}/${Date.now()}-${randomUUID()}-${safeOwner}.${extension}`;
}

export function imageExtensionFromMime(type: string) {
  const extensions: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };

  return extensions[type] || null;
}

function getFileExtension(name: string) {
  return name.split('.').pop()?.toLowerCase() || '';
}
