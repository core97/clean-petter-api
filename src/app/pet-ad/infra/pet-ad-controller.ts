import { Request, Response } from 'express';
import PetAdService from '@pet-ad/application/pet-ad.service';
import { isValidPetAdSortOption } from '@pet-ad/domain/types/pet-ad-sort-options';
import { isValidCountryIso } from '@shared/domain/types/country';
import { isValidPetType } from '@shared/domain/types/pet-type';
import { isVaidPaginationQueryParams } from '@shared/domain/types/pagination';
import { ExpressHttpHandler } from '@shared/infra/http/express-http-handler';

export default class PetAdController extends ExpressHttpHandler {
  constructor(private deps: { petAdService: PetAdService }) {
    super();
  }

  async petAdByIdGet(req: Request, res: Response) {
    if (!req.params.petAdId) {
      return this.invalidParams(res);
    }

    const petAd = await this.deps.petAdService.getOneById(req.params.petAdId);

    return this.ok(res, petAd);
  }

  async petAdByUserGet(req: Request, res: Response) {
    if (!req.payload.user?.id) {
      return this.forbidden(res);
    }

    const petAds = await this.deps.petAdService.getByUser(req.payload.user.id);

    return this.ok(res, petAds);
  }

  async petAdByCountryGet(req: Request, res: Response) {
    if (
      !isValidCountryIso(req.query.country) ||
      !isValidPetType(req.query.petType)
    ) {
      return this.invalidParams(res);
    }

    const breedsId = this.parseQueryString(req.query.breed);

    const petAds = await this.deps.petAdService.getByCountry({
      country: req.query.country,
      petType: req.query.petType,
      ...(breedsId.length && { breedIds: breedsId }),
      ...(isVaidPaginationQueryParams(req.query) && {
        pagination: {
          limit: +req.query.limit,
          page: +req.query.page,
        },
      }),
      ...(isValidPetAdSortOption(req.query.sortBy) && {
        sortBy: req.query.sortBy,
      }),
    });

    return this.ok(res, petAds);
  }

  async petAdByIdDelete(req: Request, res: Response) {
    if (!req.params.petAdId) {
      return this.invalidParams(res);
    }

    await this.deps.petAdService.deleteOneById(req.params.petAdId);

    return this.ok(res);
  }

  async petAdPost(req: Request, res: Response) {
    if (req.payload.user?.id !== req.body.userId) {
      return this.conflict(res, 'Invalid user');
    }

    const petAd = await this.deps.petAdService.create(req.body);

    return this.ok(res, petAd);
  }

  async petAdPatch(req: Request, res: Response) {
    if (req.params.petAdId) {
      return this.invalidParams(res);
    }

    if (req.payload.user?.id !== req.body.userId) {
      return this.conflict(res, 'Invalid user');
    }

    const petAd = await this.deps.petAdService.getOneById(req.params.petAdId);

    if (petAd.userId !== req.payload.user?.id) {
      return this.forbidden(res);
    }

    const petAdUpdated = await this.deps.petAdService.updateOneById({
      ...req.body,
      id: req.params.petAdId,
    });

    return this.ok(res, petAdUpdated);
  }
}
