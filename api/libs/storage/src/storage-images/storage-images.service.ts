import { Inject, Injectable } from '@nestjs/common';
import { random } from 'faker';
import * as moment from 'moment';
import { Image } from '@core/db';
import { generateAllImageSizes } from './sharp';
import { ImageSize } from './storage-images.module';
import { STORAGE_IMAGE_SIZES, Struct } from '@core/common';
import { StorageService } from '../storage.service';

/**
 * Storage service in charge of storing images.
 * It will generate multiple sizes of image.
 */
@Injectable()
export class StorageImagesService {
  constructor(
    private readonly storageService: StorageService,
    @Inject(STORAGE_IMAGE_SIZES) private readonly sizes: ImageSize[],
  ) {}

  /** Add new image. Name is quasi random number by default. */
  async storeImage(image: Buffer, id: string = random.uuid()): Promise<Partial<Image>> {
    const today = moment().format('YYYY/MM/DD');
    const folder = `${today}/${id}`;
    const filePrefix = `${folder}/image_${id}`;
    const buffersAndSizes = await generateAllImageSizes(image, this.sizes);
    const toStore = buffersAndSizes.map(img =>
      this.storageService.put(img.image, `${filePrefix}_${img.size}.jpeg`),
    );

    const storedImagesArray = await Promise.all(toStore);
    const storedImages: Struct<string> = {};

    storedImagesArray.forEach((filename, i) => {
      storedImages[buffersAndSizes[i].size] = filename;
    });

    const imageObject = { ...storedImages, id, prefix: folder };
    return imageObject;
  }

  /**
   * Delete images in all sizes
   * @param image Image that you want to delete
   * @returns Path to all deleted files
   */
  async removeImage(image: Image): Promise<string[]> {
    return this.storageService.deleteWherePrefix(image.prefix);
  }
}
