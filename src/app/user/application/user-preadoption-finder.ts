import { User } from '@user/domain/user.entity';
import { UserRepository } from '@user/domain/user.repository';
import { PetAd } from '@pet-ad/domain/pet-ad.entity';
import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';
import { PetAdRequestRepository } from '@pet-ad-request/domain/pet-ad-request.repository';
import { ConflictError } from '@shared/application/errors/conflict.error';
import { ThirdParties } from '@shared/infra/third-parties';

export default class UserPreadoptionFinder {
  constructor(
    private deps: {
      userRepository: UserRepository;
      petAdRepository: PetAdRepository;
      petAdRequestRepository: PetAdRequestRepository;
      thirdParties: ThirdParties;
    }
  ) {}

  async run(params: {
    requestingUser: User['id'];
    preadoptionUser: User['id'];
    petAd: PetAd['id'];
  }) {
    const petAd = await this.deps.petAdRepository.findOneById(params.petAd);

    if (petAd.userId !== params.requestingUser) {
      throw new ConflictError(
        'ad requesting the pre-adoption must be created by the user requesting the pre-adoption.'
      );
    }

    const petAdRequests = await this.deps.petAdRequestRepository.findByPetAd(
      params.petAd
    );

    const requestFromUser = petAdRequests.find(
      request => request.interestedUserId === params.preadoptionUser
    );

    if (!requestFromUser) {
      throw new ConflictError(`there is no request for the user's ad`);
    }

    const user = await this.deps.userRepository.findOneById(
      requestFromUser.interestedUserId
    );

    if (!user.preadoption) {
      throw new ConflictError(
        'user has not yet filled in the pre-adoption form'
      );
    }

    const formResult = await this.deps.thirdParties.typeform.getFormResult(
      user.preadoption.formId,
      user.preadoption.responseId
    );

    return formResult;
  }
}
