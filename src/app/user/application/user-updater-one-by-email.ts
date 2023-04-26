import UserValidator from '@user/application/user-validator';
import { UserRepository } from '@user/domain/user.repository';
import { Cryptographic } from '@shared/application/cryptographic';
import { StringUtils } from '@shared/application/string-utils';
import { UnprocessableEntityError } from '@shared/application/errors/unprocessable-entity.error';
import { UnauthorizatedError } from '@shared/application/errors/unauthorizated.error';

export default class UserUpdaterOneByEmail {
  constructor(
    private deps: {
      userRepository: UserRepository;
      userValidator: UserValidator;
      cryptographic: Cryptographic;
    }
  ) {}

  async run(
    user: Parameters<UserRepository['updateOneByEmail']>[0],
    options: { oldPassword?: string } = {}
  ) {
    this.deps.userValidator.validate(user);

    const userFound = await this.deps.userRepository.findOneByEmail(user.email);

    const isPasswordUpdate =
      user.password && user.password !== userFound.password;

    if (isPasswordUpdate && !options.oldPassword) {
      throw new UnprocessableEntityError(
        'old password is required to update password'
      );
    }

    let newPasswordEncrypted: string | undefined;
    if (user.password && isPasswordUpdate && options.oldPassword) {
      try {
        await this.deps.cryptographic.compare(
          options.oldPassword,
          userFound.password
        );

        newPasswordEncrypted = await this.deps.cryptographic.hash(
          user.password
        );
      } catch (error) {
        throw new UnauthorizatedError('password does not match');
      }
    }

    const { role, ...rest } = user;

    const updatedUser = await this.deps.userRepository.updateOneByEmail({
      ...rest,
      ...(user.name && { name: StringUtils.capitalizeWords(user.name) }),
      ...(newPasswordEncrypted && { password: newPasswordEncrypted }),
    });

    return updatedUser;
  }
}
