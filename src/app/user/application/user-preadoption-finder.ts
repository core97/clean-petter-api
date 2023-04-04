import UserValidator from '@user/application/user-validator';
import { UserRepository } from '@user/domain/user.repository';
import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export default class UserPreadoptionFinder {
  private userRepository: UserRepository;

  private userValidator: UserValidator;

  private petAdRepository: PetAdRepository;

  constructor(dependencies: {
    userRepository: UserRepository;
    userValidator: UserValidator;
    petAdRepository: PetAdRepository;
  }) {
    this.userRepository = dependencies.userRepository;
    this.userValidator = dependencies.userValidator;
    this.petAdRepository = dependencies.petAdRepository;
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
