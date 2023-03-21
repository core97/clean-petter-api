import { UserValidator } from '@user/application/user-validator';
import { UserRepository } from '@user/domain/user.repository';
import { StringUtils } from '@shared/application/string-utils';

export class UserUpdaterByEmail {
  constructor(private userRepo: UserRepository) {}

  async run(user: Parameters<UserRepository['updateOneByEmail']>[0]) {
    UserValidator.validate(user);

    // TODO: if password exists and is different, encrypt it
    const updatedUser = await this.userRepo.updateOneByEmail({
      ...user,
      ...(user.name && { name: StringUtils.capitalizeWords(user.name) }),
    });

    return updatedUser;
  }
}
