import { UserRepository } from '@user/domain/user.repository';
import UserValidator from '@user/application/user-validator';
import UserSignIn from '@user/application/user-sign-in';
import { StringUtils } from '@shared/application/string-utils';
import { Cryptographic } from '@shared/application/cryptographic';
import { NotFoundError } from '@shared/application/errors/not-found.error';
import { ConflictError } from '@shared/application/errors/conflict.error';

export default class UserSignUp {
  constructor(
    private deps: {
      userRepository: UserRepository;
      userSignIn: UserSignIn;
      userValidator: UserValidator;
      cryptographic: Cryptographic;
    }
  ) {}

  async run(user: Parameters<UserRepository['create']>[0]) {
    try {
      this.deps.userValidator.validate(user);

      await this.deps.userRepository.findOneByEmail(user.email);

      throw new ConflictError('user already exists');
    } catch (error) {
      if (error instanceof NotFoundError) {
        const passwordEncrypted = await this.deps.cryptographic.hash(
          user.password
        );

        const userCreated = await this.deps.userRepository.create({
          ...user,
          name: StringUtils.capitalizeWords(user.name),
          password: passwordEncrypted,
        });

        const userAndToken = await this.deps.userSignIn.run({
          email: userCreated.email,
          password: userCreated.password,
        });

        return userAndToken;
      }

      throw error;
    }
  }
}
