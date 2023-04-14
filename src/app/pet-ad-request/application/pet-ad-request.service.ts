import { PetAdRequestRepository } from '@pet-ad-request/domain/pet-ad-request.repository';

export default class PetAdRequestService {
  constructor(
    private deps: {
      petAdRequestRepository: PetAdRequestRepository;
    }
  ) {}

  async create(petAdRequest: Parameters<PetAdRequestRepository['create']>[0]) {
    const creation = await this.deps.petAdRequestRepository.create(
      petAdRequest
    );
    return creation;
  }

  async deleteOneById(
    petAdRequestId: Parameters<PetAdRequestRepository['deleteOneById']>[0]
  ) {
    await this.deps.petAdRequestRepository.deleteOneById(petAdRequestId);
  }

  async getOneById(
    petAdRequest: Parameters<PetAdRequestRepository['findOneById']>[0]
  ) {
    const request = await this.deps.petAdRequestRepository.findOneById(
      petAdRequest
    );
    return request;
  }

  async getByPetAd(
    petAdId: Parameters<PetAdRequestRepository['findByPetAd']>[0]
  ) {
    const request = await this.deps.petAdRequestRepository.findByPetAd(petAdId);
    return request;
  }

  async updateOneById(
    petAd: Parameters<PetAdRequestRepository['updateOneById']>[0]
  ) {
    const update = await this.deps.petAdRequestRepository.updateOneById(petAd);
    return update;
  }
}
