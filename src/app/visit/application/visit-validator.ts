import { VisitProps } from '@visit/domain/visit.entity';
import PetAdRequestService from '@pet-ad-request/application/pet-ad-request.service';
import PetAdService from '@pet-ad/application/pet-ad.service';
import { Address } from '@shared/domain/address.value-object';
import { ConflictError } from '@shared/application/errors/conflict.error';

export default class VisitValidator {
  constructor(
    private deps: {
      petAdRequestService: PetAdRequestService;
      petAdService: PetAdService;
    }
  ) {}

  async validate(visit: Partial<VisitProps>) {
    if (visit.type && visit.petAdRequestId) {
      const petAdRequest = await this.deps.petAdRequestService.getOneById(
        visit.petAdRequestId
      );

      if (visit.type === 'VISIT_PET' && visit.userId !== petAdRequest.userId) {
        throw new ConflictError(
          `User who created the "${visit.type}" visit is different from the user who created the request to the pet ad`
        );
      }

      if (visit.type === 'VISIT_NEXT_HOME') {
        const petAd = await this.deps.petAdService.getOneById(
          petAdRequest.petAdId
        );

        if (visit.userId !== petAd.userId) {
          throw new ConflictError(
            `User who created the "${visit.type}" visit is different from the user of the pet ad`
          );
        }
      }
    }

    if (
      visit.address?.geoJSON &&
      !Address.isValidCoordinates(visit.address.geoJSON)
    ) {
      throw new ConflictError('Invalid coordinates for visit address');
    }
  }
}
