import { Request, Response } from 'express';
import BreedService from '@breed/application/breed.service';
import { isValidPetType, PetType } from '@shared/domain/types/pet-type';
import { isVaidPaginationQueryParams } from '@shared/domain/types/pagination';
import { ExpressHttpHandler } from '@shared/infra/http/express-http-handler';

export default class BreedController extends ExpressHttpHandler {
  constructor(private deps: { breedService: BreedService }) {
    super();
  }

  async breedByIdGet(req: Request, res: Response) {
    if (!req.params.breedId) {
      return this.invalidParams(res);
    }

    const breed = await this.deps.breedService.getOneById(req.params.breedId);

    return this.ok(res, breed);
  }

  async breedsByPetTypeGet(req: Request, res: Response) {
    if (!isValidPetType(req.params.petType.toUpperCase())) {
      return this.invalidParams(res);
    }

    const results = await this.deps.breedService.getByPetType({
      petType: req.params.petType.toUpperCase() as PetType,
      ...(isVaidPaginationQueryParams(req.query) && {
        pagination: {
          limit: +req.query.limit,
          page: +req.query.page,
        },
      }),
    });

    return this.ok(res, results);
  }

  async breedDelete(req: Request, res: Response) {
    if (!req.params.breedId) {
      return this.invalidParams(res);
    }

    await this.deps.breedService.deleteOneById(req.params.breedId);

    return this.ok(res);
  }

  async breedPost(req: Request, res: Response) {
    const breed = await this.deps.breedService.create(req.body);

    return this.ok(res, breed);
  }

  async breedPatch(req: Request, res: Response) {
    if (req.params.breedId) {
      return this.invalidParams(res);
    }

    const breedUpdated = await this.deps.breedService.updateOneById({
      ...req.body,
      id: req.params.breedId,
    });

    return this.ok(res, breedUpdated);
  }
}
