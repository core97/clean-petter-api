import { UserRepository } from '@user/domain/user.repository';

export default class UserFinderOneByEmail {
  constructor(private deps: { userRepository: UserRepository }) {}

  async run(email: Parameters<UserRepository['findOneByEmail']>[0]) {
    const user = await this.deps.userRepository.findOneByEmail(email);

    return user;
  }
}
