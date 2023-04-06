import {
  PetAdRequest,
  PetAdRequestProps,
} from '@pet-ad-request/domain/pet-ad-request.entity';
import { Repository } from '@shared/domain/types/repository';

export interface PetAdRequestRepository
  extends Repository<PetAdRequest, PetAdRequestProps> {}
