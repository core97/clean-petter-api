import { UserRepository } from '@user/domain/user.repository';
import { UserValidator } from '@user/application/user-validator';
import { StringUtils } from '@shared/application/string-utils';

export class UserCreator {
  constructor(private userRepo: UserRepository) {}

  async run(user: Parameters<UserRepository['create']>[0]) {
    UserValidator.validate(user);

    // TODO: encrypt password
    const userCreated = await this.userRepo.create({
      ...user,
      name: StringUtils.capitalizeWords(user.name),
    });

    return userCreated;
  }
}
