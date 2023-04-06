import { PetAdProps } from '@pet-ad/domain/pet-ad.entity';
import { BreedRepository } from '@breed/domain/breed.repository';

export default class PetAdValidator {
  private breedRepository: BreedRepository;

  constructor(dependencies: { breedRepository: BreedRepository }) {
    this.breedRepository = dependencies.breedRepository;
  }

  async validate(petAd: Partial<PetAdProps>) {
    if (petAd.breedIds) {
      if (!petAd.breedIds?.length) {
        throw Error('breeds is empty');
      }

      if (petAd.breedIds.length > 2) {
        throw Error('may not have more than two breeds');
      }

      const breeds = await Promise.all(
        petAd.breedIds.map(this.breedRepository.findOneById)
      );

      const hasCatBreeds = breeds.some(breed => breed?.props.petType === 'CAT');

      const hasDogBreeds = breeds.some(breed => breed?.props.petType === 'DOG');

      if (hasCatBreeds && hasDogBreeds) {
        throw Error('ad has breeds of different pets');
      }
    }
  }
}
