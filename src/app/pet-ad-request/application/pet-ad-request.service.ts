import { PetAdRequestRepository } from '@pet-ad-request/domain/pet-ad-request.repository';

export default class PetAdRequestService {
  private petAdRequestRepository: PetAdRequestRepository;

  constructor(dependencies: {
    petAdRequestRepository: PetAdRequestRepository;
  }) {
    this.petAdRequestRepository = dependencies.petAdRequestRepository;
  }

  async create(petAdRequest: Parameters<PetAdRequestRepository['create']>[0]) {
    const creation = await this.petAdRequestRepository.create(petAdRequest);
    return creation;
  }

  async deleteOneById(
    petAdRequestId: Parameters<PetAdRequestRepository['deleteOneById']>[0]
  ) {
    await this.petAdRequestRepository.deleteOneById(petAdRequestId);
  }

  async getOneById(
    petAdRequest: Parameters<PetAdRequestRepository['findOneById']>[0]
  ) {
    const request = await this.petAdRequestRepository.findOneById(petAdRequest);
    return request;
  }

  async updateOneById(
    petAd: Parameters<PetAdRequestRepository['updateOneById']>[0]
  ) {
    const update = await this.petAdRequestRepository.updateOneById(petAd);
    return update;
  }
}
