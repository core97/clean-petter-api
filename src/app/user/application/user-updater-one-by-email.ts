import UserValidator from '@user/application/user-validator';
import { UserRepository } from '@user/domain/user.repository';
import { Cryptographic } from '@shared/application/cryptographic';
import { StringUtils } from '@shared/application/string-utils';
import { UnprocessableEntityError } from '@shared/application/errors/unprocessable-entity.error';
import { UnauthorizatedError } from '@shared/application/errors/unauthorizated.error';

export default class UserUpdaterOneByEmail {
  private userRepository: UserRepository;

  private userValidator: UserValidator;

  private cryptographic: Cryptographic;

  constructor(dependencies: {
    userRepository: UserRepository;
    userValidator: UserValidator;
    cryptographic: Cryptographic;
  }) {
    this.userRepository = dependencies.userRepository;
    this.userValidator = dependencies.userValidator;
    this.cryptographic = dependencies.cryptographic;
  }

  async run(
    user: Parameters<UserRepository['updateOneByEmail']>[0],
    options: { oldPassword?: string } = {}
  ) {
    this.userValidator.validate(user);

    const userFound = await this.userRepository.findOneByEmail(user.email);

    const isPasswordUpdate =
      user.password && user.password !== userFound.props.password;

    if (isPasswordUpdate && !options.oldPassword) {
      throw new UnprocessableEntityError(
        'old password is required to update password'
      );
    }

    let newPasswordEncrypted: string | undefined;
    if (user.password && isPasswordUpdate && options.oldPassword) {
      try {
        await this.cryptographic.compare(
          options.oldPassword,
          userFound.props.password
        );

        newPasswordEncrypted = await this.cryptographic.hash(user.password);
      } catch (error) {
        throw new UnauthorizatedError('password does not match');
      }
    }

    const updatedUser = await this.userRepository.updateOneByEmail({
      ...user,
      ...(user.name && { name: StringUtils.capitalizeWords(user.name) }),
      ...(newPasswordEncrypted && { password: newPasswordEncrypted }),
    });

    return updatedUser;
  }
}
