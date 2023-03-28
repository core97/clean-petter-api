import { UserRepository } from '@user/domain/user.repository';
import { UserValidator } from '@user/application/user-validator';
import { StringUtils } from '@shared/application/string-utils';

export class UserSignUp {
  constructor(
    private userRepo: UserRepository,
    private userValidator: UserValidator
  ) {}

  async run(user: Parameters<UserRepository['create']>[0]) {
    this.userValidator.validate(user);

    // TODO: encrypt password
    const userCreated = await this.userRepo.create({
      ...user,
      name: StringUtils.capitalizeWords(user.name),
    });

    return userCreated;
  }
}
