import { UserRepository } from '@user/domain/user.repository';
import UserValidator from '@user/application/user-validator';
import { Cryptographic } from '@shared/application/cryptographic';
import { Authentication } from '@shared/application/authentication';
import { UnauthorizatedError } from '@shared/application/errors/unauthorizated.error';

export default class UserSignIn {
  constructor(
    private deps: {
      userRepository: UserRepository;
      userValidator: UserValidator;
      cryptographic: Cryptographic;
      authentication: Authentication;
    }
  ) {}

  async run(user: { email: string; password: string }) {
    this.deps.userValidator.validate(user);

    const userFound = await this.deps.userRepository.findOneByEmail(user.email);

    try {
      await this.deps.cryptographic.compare(user.password, userFound.password);
    } catch (error) {
      throw new UnauthorizatedError('Password does not match');
    }

    try {
      const token = this.deps.authentication.createAuthToken({
        email: userFound.email,
        id: userFound.id,
      });

      return { user: userFound, token };
    } catch (error) {
      throw new UnauthorizatedError(
        error instanceof Error
          ? error.message
          : 'Unexpected error in auth token creation'
      );
    }
  }
}
