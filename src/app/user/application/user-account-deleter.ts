import { UserRepository } from '@user/domain/user.repository';
import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export default class UserAccountDeleter {
  private userRepository: UserRepository;

  private petAdRepository: PetAdRepository;

  constructor(deps: {
    userRepository: UserRepository;
    petAdRepository: PetAdRepository;
  }) {
    this.userRepository = deps.userRepository;
    this.petAdRepository = deps.petAdRepository;
  }

  async run(email: Parameters<UserRepository['deleteOneByEmail']>[0]) {
    const user = await this.userRepository.findOneByEmail(email);

    await this.petAdRepository.deleteByUser(user.id);

    await this.userRepository.deleteOneByEmail(email);
  }
}
