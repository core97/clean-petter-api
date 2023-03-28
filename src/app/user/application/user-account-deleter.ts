import { UserRepository } from '@user/domain/user.repository';
import { PetAdRepository } from '@pet-ad/domain/pet-ad.repository';

export class UserAccountDeleter {
  constructor(
    private userRepo: UserRepository,
    private petAdRepo: PetAdRepository
  ) {}

  async run(email: Parameters<UserRepository['deleteOneByEmail']>[0]) {
    const user = await this.userRepo.findOneByEmail(email);

    await this.petAdRepo.deleteByUser(user.props.id);

    await this.userRepo.deleteOneByEmail(email);
  }
}
