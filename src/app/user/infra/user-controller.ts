import { Request, Response } from 'express';
import { User } from '@user/domain/user.entity';
import UserAccountDeleter from '@user/application/user-account-deleter';
import UserFinderOneByEmail from '@user/application/user-finder-one-by-email';
import UserSignIn from '@user/application/user-sign-in';
import UserSignUp from '@user/application/user-sign-up';
import UserUpdaterOneByEmail from '@user/application/user-updater-one-by-email';
import { ExpressHttpHandler } from '@shared/infra/http/express-http-handler';
import { ThirdParties } from '@shared/infra/third-parties';

export default class UserController extends ExpressHttpHandler {
  private userAccountDeleter!: UserAccountDeleter;

  private userFinderOneByEmail!: UserFinderOneByEmail;

  private userSignIn!: UserSignIn;

  private userSignUp!: UserSignUp;

  private userUpdaterOneByEmail!: UserUpdaterOneByEmail;

  private thirdParties!: ThirdParties;

  constructor(dependencies: {
    userAccountDeleter: UserAccountDeleter;
    userFinderOneByEmail: UserFinderOneByEmail;
    userSignIn: UserSignIn;
    userSignUp: UserSignUp;
    userUpdaterOneByEmail: UserUpdaterOneByEmail;
    thirdParties: ThirdParties;
  }) {
    super();
    Object.assign(this, dependencies);
  }

  async userAccountDelete(req: Request, res: Response) {
    if (!User.isValidEmail(req.query.email)) {
      return this.invalidParams(res);
    }

    if (req.payload?.user?.email !== req.params.email) {
      return this.forbidden(res);
    }

    await this.userAccountDeleter.run(req.params.email);

    return this.ok(res);
  }

  async userByEmailGet(req: Request, res: Response) {
    if (!User.isValidEmail(req.params.email)) {
      return this.invalidParams(res);
    }

    const user = await this.userFinderOneByEmail.run(req.params.email);

    const isSameUser = req.payload?.user?.email === user.email;

    const userDto = user.getPublicData(isSameUser);

    return this.ok(res, userDto);
  }

  async signInPut(req: Request, res: Response) {
    const { token, user } = await this.userSignIn.run(req.body);

    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // one week
      httpOnly: true,
    });

    return this.ok(res, user);
  }

  async signUpPost(req: Request, res: Response) {
    const { token, user } = await this.userSignUp.run(req.body);

    res?.cookie(process.env.AUTH_COOKIE_NAME, token, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // one week
      httpOnly: true,
    });

    return this.ok(res, user);
  }

  async userPatch(req: Request, res: Response) {
    if (req.payload?.user?.email !== req.params.email) {
      return this.forbidden(res);
    }

    const user = await this.userUpdaterOneByEmail.run({
      email: req.params.email,
      ...req.body,
    });

    const userDto = user.getPublicData(true);

    return this.ok(res, userDto);
  }

  async peadoptionGet(req: Request, res: Response) {
    /**
     * TODO: crear un caso de uso
     * - Hacer que el endpoint sea necesario la autenticacion
     * - Obtener el usuario a traves del token
     * - Obtener los anuncios del usuario y obtener el usuario que se ha interesado por el anuncio
     * - Comprobar si el usuario que nos ha pasado como req.params.email esta dentro de los interesados del anuncio
     * - Si es asi, obtener su formulario de preadopcion con user.preadoption
     */

    if (!req.payload?.user) {
      return this.unauthorized(res);
    }

    if (
      typeof req.query.formId !== 'string' ||
      typeof req.query.responseId !== 'string' ||
      typeof req.params.email !== 'string'
    ) {
      return this.invalidParams(res);
    }

    const formResult = await this.thirdParties.typeform.getFormResult(
      req.query.formId,
      req.query.responseId
    );

    return this.ok(res, formResult);
  }
}
