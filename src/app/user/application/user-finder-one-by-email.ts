import { UserRepository } from '@user/domain/user.repository';

export default class UserFinderOneByEmail {
  private userRepository: UserRepository;

  constructor(deps: { userRepository: UserRepository }) {
    this.userRepository = deps.userRepository;
  }

  async run(email: Parameters<UserRepository['findOneByEmail']>[0]) {
    const user = await this.userRepository.findOneByEmail(email);

    return user;
  }
}
