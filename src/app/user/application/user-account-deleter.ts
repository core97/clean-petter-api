import { UserRepository } from '@user/domain/user.repository';
import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export default class UserAccountDeleter {
  constructor(
    private deps: {
      userRepository: UserRepository;
      petAdRepository: PetAdRepository;
    }
  ) {}

  async run(email: Parameters<UserRepository['deleteOneByEmail']>[0]) {
    const user = await this.deps.userRepository.findOneByEmail(email);

    await this.deps.petAdRepository.deleteByUser(user.id);

    await this.deps.userRepository.deleteOneByEmail(email);
  }
}
