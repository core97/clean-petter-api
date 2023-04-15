import { PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { BreedRepository } from '@breed/domain/breed.repository';
import { ConflictError } from '@shared/application/errors/conflict.error';
import { Address } from '@shared/domain/address.value-object';

export default class PetAdValidator {
  constructor(private deps: { breedRepository: BreedRepository }) {}

  async validate(petAd: Partial<PetAdProps>) {
    if (petAd.breedIds) {
      if (!petAd.breedIds?.length) {
        throw new ConflictError('Breeds is empty');
      }

      if (petAd.breedIds.length > 2) {
        throw new ConflictError('May not have more than two breeds');
      }

      const breeds = await Promise.all(
        petAd.breedIds.map(this.deps.breedRepository.findOneById)
      );

      const hasCatBreeds = breeds.some(breed => breed?.petType === 'CAT');

      const hasDogBreeds = breeds.some(breed => breed?.petType === 'DOG');

      if (hasCatBreeds && hasDogBreeds) {
        throw new ConflictError('Pet ad has breeds of different pets');
      }

      if (
        petAd.address?.geoJSON &&
        !Address.isValidCoordinates(petAd.address.geoJSON)
      ) {
        throw new ConflictError('Invalid coordinates for pet ad address');
      }
    }
  }
}
