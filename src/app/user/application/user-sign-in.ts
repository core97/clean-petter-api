import { UserRepository } from '@user/domain/user.repository';
import UserValidator from '@user/application/user-validator';
import { Cryptographic } from '@shared/application/cryptographic';
import { Authentication } from '@shared/application/authentication';

export default class UserSignIn {
  private userRepository: UserRepository;

  private userValidator: UserValidator;

  private cryptographic: Cryptographic;

  private authentication: Authentication;

  constructor(dependencies: {
    userRepository: UserRepository;
    userValidator: UserValidator;
    cryptographic: Cryptographic;
    authentication: Authentication;
  }) {
    this.userRepository = dependencies.userRepository;
    this.userValidator = dependencies.userValidator;
    this.cryptographic = dependencies.cryptographic;
    this.authentication = dependencies.authentication;
  }

  async run(user: { email: string; password: string }) {
    try {
      this.userValidator.validate(user);

      const userFound = await this.userRepository.findOneByEmail(user.email);

      try {
        await this.cryptographic.compare(
          user.password,
          userFound.props.password
        );
      } catch (error) {
        throw new Error('password does not match');
      }

      const token = this.authentication.createAuthToken({
        email: userFound.props.email,
        id: userFound.props.id,
      });

      return { user: userFound.props, token };
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);

      throw new Error('unauthorized');
    }
  }
}
