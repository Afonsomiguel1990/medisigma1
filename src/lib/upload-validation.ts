type UploadValidationOptions = {
  allowedExtensions: string[];
  allowedTypes: string[];
  maxSizeBytes: number;
};

function getExtension(fileName: string) {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts.pop() || '' : '';
}

export function validateUploadedFile(file: File, options: UploadValidationOptions) {
  const extension = getExtension(file.name);

  if (!options.allowedExtensions.includes(extension)) {
    return `Extensao de ficheiro nao permitida: .${extension || 'sem extensao'}`;
  }

  if (file.size > options.maxSizeBytes) {
    const maxMb = Math.floor(options.maxSizeBytes / 1024 / 1024);
    return `Ficheiro muito grande. Maximo ${maxMb}MB.`;
  }

  if (file.type && !options.allowedTypes.includes(file.type)) {
    return 'Tipo de ficheiro nao permitido.';
  }

  return null;
}
