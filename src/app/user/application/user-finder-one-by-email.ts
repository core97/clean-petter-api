import { UserRepository } from '@user/domain/user.repository';

export class UserFinderOneByEmail {
  constructor(private userRepo: UserRepository) {}

  async run(email: Parameters<UserRepository['findOneByEmail']>[0]) {
    const user = await this.userRepo.findOneByEmail(email);

    return user;
  }
}
