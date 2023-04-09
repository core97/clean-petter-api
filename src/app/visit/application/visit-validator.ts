import { VisitProps } from '@visit/domain/visit.entity';
import { Address } from '@shared/domain/address.value-object';
import { ConflictError } from '@shared/application/errors/conflict.error';

export default class VisitValidator {
  validate(visit: Partial<VisitProps>) {
    if (
      visit.address?.geoJSON &&
      !Address.isValidCoordinates(visit.address.geoJSON)
    ) {
      throw new ConflictError('invalid coordinates for visit address');
    }
  }
}
