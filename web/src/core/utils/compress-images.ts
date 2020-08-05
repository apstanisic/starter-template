import Compressor from 'compressorjs';

/**
 * Compress provided images
 * Check for uppy or browser-image-compression modules in the future
 */
export function compressImages(images: File[]): Promise<File[]> {
  return new Promise((res, rej) => {
    const compressedImages: File[] = [];
    images.forEach((image) => {
      new Compressor(image, {
        maxHeight: 2000,
        maxWidth: 2000,
        mimeType: 'image/jpeg',
        quality: 0.8,
        success(blob) {
          const file = new File([blob], image.name + Date.now() + Math.random() * 10000, {
            type: blob.type,
          });
          compressedImages.push(file);
          if (images.length === compressedImages.length) {
            res(compressedImages);
          }
        },
        error(error) {
          console.log(error);
          rej('Images are not valid');
        },
      });
    });
  });
}
