// Wrapper around File that adds preview
export interface MetaFile {
  file: File;
  preview?: string;
}

/**
 * This function generates preview for provided file from dropzone
 * @param file File to show preview
 * @return Promise with value that can be added to img.src tag
 */
export function imagePreview(file: MetaFile): Promise<MetaFile> {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = (): any => {
      const { result } = fr;
      file.preview = typeof result !== 'string' ? undefined : result;
      return resolve(file);
    };
    fr.readAsDataURL(file.file);
  });
}
