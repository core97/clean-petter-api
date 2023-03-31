import { Request, Response } from 'express';
import { User } from '@user/domain/user.entity';
import UserAccountDeleter from '@user/application/user-account-deleter';
import UserFinderOneByEmail from '@user/application/user-finder-one-by-email';
import UserSignIn from '@user/application/user-sign-in';
import UserSignUp from '@user/application/user-sign-up';
import UserUpdaterOneByEmail from '@user/application/user-updater-one-by-email';

export default class UserController {
  private userAccountDeleter: UserAccountDeleter;

  private userFinderOneByEmail: UserFinderOneByEmail;

  private userSignIn: UserSignIn;

  private userSignUp: UserSignUp;

  private userUpdaterOneByEmail: UserUpdaterOneByEmail;

  constructor(dependencies: {
    userAccountDeleter: UserAccountDeleter;
    userFinderOneByEmail: UserFinderOneByEmail;
    userSignIn: UserSignIn;
    userSignUp: UserSignUp;
    userUpdaterOneByEmail: UserUpdaterOneByEmail;
  }) {
    this.userAccountDeleter = dependencies.userAccountDeleter;
    this.userFinderOneByEmail = dependencies.userFinderOneByEmail;
    this.userSignIn = dependencies.userSignIn;
    this.userSignUp = dependencies.userSignUp;
    this.userUpdaterOneByEmail = dependencies.userUpdaterOneByEmail;
  }

  async userAccountDelete(req: Request, response: Response) {
    if (!User.isValidEmail(req.query.email)) {
      return response.status(422).end();
    }

    await this.userAccountDeleter.run(req.params.email);

    return response.status(200).end();
  }

  async userByEmailGet(req: Request, response: Response) {
    if (!User.isValidEmail(req.params.email)) {
      return response.status(422).end();
    }

    const user = await this.userFinderOneByEmail.run(req.params.email);

    const isSameUser = req.payload?.user?.email === user.props.email;

    const userDto = user.getPublicData(isSameUser);

    return response.status(200).json(userDto);
  }

  async signInPut(req: Request, response: Response) {
    const { token, user } = await this.userSignIn.run(req.body);

    response.cookie(process.env.AUTH_COOKIE_NAME, token, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // one week
      httpOnly: true,
    });

    return response.status(200).json(user);
  }

  async signUpPost(
    req: { body: { email: string; password: string; name: string } },
    response?: Response
  ) {
    const { token, user } = await this.userSignUp.run(req.body);

    response?.cookie(process.env.AUTH_COOKIE_NAME, token, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // one week
      httpOnly: true,
    });

    return response?.status(200).json(user);
  }

  async userPatch(req: Request, response: Response) {
    if (req.payload?.user?.email !== req.params.email) {
      return response.status(403).end();
    }

    const user = await this.userUpdaterOneByEmail.run({
      email: req.params.email,
      ...req.body,
    });

    const userDto = user.getPublicData(true);

    return response.status(200).json(userDto);
  }
}
