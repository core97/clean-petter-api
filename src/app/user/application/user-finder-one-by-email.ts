import { UserRepository } from '@user/domain/user.repository';

export default class UserFinderOneByEmail {
  private userRepository: UserRepository;

  constructor(dependencies: { userRepository: UserRepository }) {
    this.userRepository = dependencies.userRepository;
  }

  async run(email: Parameters<UserRepository['findOneByEmail']>[0]) {
    const user = await this.userRepository.findOneByEmail(email);

    return user;
  }
}
