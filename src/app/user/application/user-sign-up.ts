import { UserRepository } from '@user/domain/user.repository';
import UserValidator from '@user/application/user-validator';
import UserSignIn from '@user/application/user-sign-in';
import { StringUtils } from '@shared/application/string-utils';
import { Cryptographic } from '@shared/application/cryptographic';

export default class UserSignUp {
  private userRepository: UserRepository;

  private userSignIn: UserSignIn;

  private userValidator: UserValidator;

  private cryptographic: Cryptographic;

  constructor(dependencies: {
    userRepository: UserRepository;
    userSignIn: UserSignIn;
    userValidator: UserValidator;
    cryptographic: Cryptographic;
  }) {
    this.userRepository = dependencies.userRepository;
    this.userSignIn = dependencies.userSignIn;
    this.userValidator = dependencies.userValidator;
    this.cryptographic = dependencies.cryptographic;
  }

  async run(user: Parameters<UserRepository['create']>[0]) {
    
    try {
      this.userValidator.validate(user);
      
      await this.userRepository.findOneByEmail(user.email);

      throw new Error('user already exists');
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        const passwordEncrypted = await this.cryptographic.hash(user.password);

        const userCreated = await this.userRepository.create({
          ...user,
          name: StringUtils.capitalizeWords(user.name),
          password: passwordEncrypted,
        });

        const userAndToken = await this.userSignIn.run({
          email: userCreated.props.email,
          password: userCreated.props.password,
        });

        return userAndToken;
      }

      throw error;
    }
  }
}
