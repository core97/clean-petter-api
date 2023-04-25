import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { User } from '@user/domain/user.entity';
import UserAccountDeleter from '@user/application/user-account-deleter';
import UserFinderOneByEmail from '@user/application/user-finder-one-by-email';
import UserSignIn from '@user/application/user-sign-in';
import UserSignUp from '@user/application/user-sign-up';
import UserUpdaterOneByEmail from '@user/application/user-updater-one-by-email';
import UserPreadoptionFinder from '@user/application/user-preadoption-finder';
import { ExpressHttpHandler } from '@shared/infra/http/express-http-handler';
import { Logger } from '@shared/application/logger';
import { Authentication } from '@shared/application/authentication';

export default class UserController extends ExpressHttpHandler {
  constructor(
    private deps: {
      userAccountDeleter: UserAccountDeleter;
      userFinderOneByEmail: UserFinderOneByEmail;
      userSignIn: UserSignIn;
      userSignUp: UserSignUp;
      userUpdaterOneByEmail: UserUpdaterOneByEmail;
      userPreadoptionFinder: UserPreadoptionFinder;
      authentication: Authentication;
      logger: Logger;
    }
  ) {
    super();
  }

  async userAccountDelete(req: Request, res: Response) {
    if (!User.isValidEmail(req.query.email)) {
      return this.invalidParams(res);
    }

    if (req.payload?.user?.email !== req.params.email) {
      return this.forbidden(res);
    }

    await this.deps.userAccountDeleter.run(req.params.email);

    return this.ok(res);
  }

  async userByEmailGet(req: Request, res: Response) {
    if (!User.isValidEmail(req.params.email)) {
      return this.invalidParams(res);
    }

    const user = await this.deps.userFinderOneByEmail.run(req.params.email);

    const isSameUser = req.payload?.user?.email === user.email;

    const userDto = user.getPublicData(isSameUser);

    return this.ok(res, userDto);
  }

  async userBySessionGet(req: Request, res: Response) {
    let userDto: ReturnType<User['getPublicData']> | null = null;

    if (!req.params.sessionToken) {
      return this.invalidParams(res);
    }

    const { email } = this.deps.authentication.validateAuthToken(
      req.params.sessionToken
    );

    const user = await this.deps.userFinderOneByEmail.run(email);

    userDto = user.getPublicData(true);

    return this.ok(res, userDto);
  }

  async signInPut(req: Request, res: Response) {
    const { token, user } = await this.deps.userSignIn.run(req.body);

    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
      path: '/',
      sameSite: 'strict',
      expires: dayjs().add(1, 'week').toDate(),
      httpOnly: true,
    });

    return this.ok(res, user.getPublicData(true));
  }

  async signUpPost(req: Request, res: Response) {
    const { token, user } = await this.deps.userSignUp.run(req.body);

    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
      path: '/',
      sameSite: 'strict',
      expires: dayjs().add(1, 'week').toDate(),
      httpOnly: true,
    });

    return this.ok(res, user.getPublicData(true));
  }

  async userPatch(req: Request, res: Response) {
    if (req.payload?.user?.email !== req.params.email) {
      return this.forbidden(res);
    }

    const user = await this.deps.userUpdaterOneByEmail.run({
      email: req.params.email,
      ...req.body,
    });

    const userDto = user.getPublicData(true);

    return this.ok(res, userDto);
  }

  async peadoptionGet(req: Request, res: Response) {
    if (!req.payload?.user) {
      return this.unauthorized(res);
    }

    if (
      typeof req.params.userId !== 'string' ||
      typeof req.params.petAdId !== 'string'
    ) {
      return this.invalidParams(res);
    }

    const preadoption = await this.deps.userPreadoptionFinder.run({
      petAd: req.params.petAdId,
      preadoptionUser: req.params.userId,
      requestingUser: req.payload.user.id,
    });

    return this.ok(res, preadoption);
  }
}
