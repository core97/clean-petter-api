import { BreedRepository } from '@breed/domain/breed.repository';
import BreedValidator from '@breed/application/breed-validator';
import { StringUtils } from '@shared/application/string-utils';

export default class BreedService {
  constructor(
    private deps: {
      breedRepository: BreedRepository;
      breedValidator: BreedValidator;
    }
  ) {}

  async create(breed: Parameters<BreedRepository['create']>[0]) {
    this.deps.breedValidator.validate(breed);

    const breedCreated = await this.deps.breedRepository.create({
      ...breed,
      name: StringUtils.toSnakeCase(breed.name).toUpperCase(),
    });

    return breedCreated;
  }

  async deleteOneById(
    breedId: Parameters<BreedRepository['deleteOneById']>[0]
  ) {
    // TODO: remove pet ads with this breed
    await this.deps.breedRepository.deleteOneById(breedId);
  }

  async getByPetType(params: Parameters<BreedRepository['findByPetType']>[0]) {
    const breeds = await this.deps.breedRepository.findByPetType(params);

    return breeds;
  }

  async getOneByName(
    breedName: Parameters<BreedRepository['findOneByName']>[0]
  ) {
    const breed = await this.deps.breedRepository.findOneByName(breedName);

    return breed;
  }

  async getOneById(breedId: Parameters<BreedRepository['findOneById']>[0]) {
    const breed = await this.deps.breedRepository.findOneById(breedId);

    return breed;
  }

  async updateOneById(breed: Parameters<BreedRepository['updateOneById']>[0]) {
    this.deps.breedValidator.validate(breed);

    const updatedBreed = await this.deps.breedRepository.updateOneById({
      ...breed,
      ...(breed.name && {
        name: StringUtils.toSnakeCase(breed.name).toUpperCase(),
      }),
    });

    return updatedBreed;
  }
}
