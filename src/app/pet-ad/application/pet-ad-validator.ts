import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { CatBreed, DogBreed } from '@breed/domain/enums/breed-name.enum';

export class PetAdValidator {
  static validate(petAd: Partial<PetAd['props']>) {
    if (petAd.breeds) {
      if (!petAd.breeds?.length) {
        throw Error('breeds is empty');
      }

      if (petAd.breeds.length > 2) {
        throw Error('may not have more than two breeds');
      }

      const hasCatBreed = petAd.breeds?.some(breed =>
        (Object.values(CatBreed) as string[]).includes(breed.props.name)
      );

      const hasDogBreed = petAd.breeds?.some(breed =>
        (Object.values(DogBreed) as string[]).includes(breed.props.name)
      );

      if (hasCatBreed && hasDogBreed) {
        throw Error('ad has breeds of different pets');
      }
    }
  }
}
