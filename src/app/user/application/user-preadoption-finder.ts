import UserValidator from '@user/application/user-validator';
import { UserRepository } from '@user/domain/user.repository';
import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export default class UserPreadoptionFinder {
  private userRepository: UserRepository;

  private userValidator: UserValidator;

  private petAdRepository: PetAdRepository;

  constructor(deps: {
    userRepository: UserRepository;
    userValidator: UserValidator;
    petAdRepository: PetAdRepository;
  }) {
    this.userRepository = deps.userRepository;
    this.userValidator = deps.userValidator;
    this.petAdRepository = deps.petAdRepository;
  }

  /* async run(params: {
    requestingUser: User['props']['email'];
    preadoptionUser: User['props']['email'];
  }) {
    const requestingUser = await this.userRepository.findOneByEmail(
      params.requestingUser
    );

    const userPetAds = await this.petAdRepository.findByUser(
      requestingUser.props.id
    );

    const userIsInterested = userPetAds.some(petAd => true)
  } */
}
