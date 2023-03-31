import { Request, Response } from 'express';
import BreedService from '@breed/application/breed.service';
import { isValidPetType } from '@shared/domain/types/pet-type';

export default class BreedController {
  private breedService: BreedService;

  constructor(dependencies: { breedService: BreedService }) {
    this.breedService = dependencies.breedService;
  }

  async breedPost(req: Request, res: Response) {
    const breed = await this.breedService.create(req.body);

    return res.status(201).json(breed.props);
  }

  async breedByIdDelete(req: Request, res: Response) {
    await this.breedService.deleteOneById(req.params.id);

    return res.status(200).end;
  }

  async breedsByPetTypeGet(req: Request, res: Response) {
    if (!isValidPetType(req.params.petType)) {
      return res.status(422).end();
    }

    const breeds = await this.breedService.getByPetType(req.params.petType);

    return res.status(200).json(breeds.map(({ props }) => props));
  }

  async breedByNameGet(req: Request, res: Response) {
    const breed = await this.breedService.getOneById(req.params.name);

    return res.status(200).json(breed.props);
  }

  async breedByIdPatch(req: Request, res: Response) {
    const breed = await this.breedService.updateOneById({
      id: req.params.id,
      ...req.body,
    });

    return res.status(201).json(breed.props);
  }
}
