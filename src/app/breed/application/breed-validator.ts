import { PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { ConflictError } from '@shared/application/errors/conflict.error';

const IMAGES_PER_BREED = {
  MAX: 4,
  MIN: 1,
};

export default class BreedValidator {
  constructor(private deps: {}) {}

  async validate(breed: Partial<PetAdProps>) {
    if (
      breed.images &&
      breed.images.length <= IMAGES_PER_BREED.MIN &&
      breed.images.length > IMAGES_PER_BREED.MAX
    ) {
      throw new ConflictError(
        `Breed cannot have more than ${IMAGES_PER_BREED} images`
      );
    }
  }
}
