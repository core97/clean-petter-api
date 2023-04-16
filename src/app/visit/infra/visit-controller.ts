import { Request, Response } from 'express';
import VisitService from '@visit/application/visit.service';
import { ExpressHttpHandler } from '@shared/infra/http/express-http-handler';

export default class VisitController extends ExpressHttpHandler {
  constructor(private deps: { visitService: VisitService }) {
    super();
  }

  async visitByIdGet(req: Request, res: Response) {
    if (!req.params.visitId) {
      return this.invalidParams(res);
    }

    const visit = await this.deps.visitService.getOneById(req.params.visitId);

    if (!visit.isBelongsToVisit(req.payload.user?.id)) {
      return this.forbidden(res);
    }

    return this.ok(res, visit);
  }

  async visitByUserGet(req: Request, res: Response) {
    if (!req.payload.user?.id) {
      return this.unauthorized(res);
    }

    const visits = await this.deps.visitService.getByUser(req.payload.user.id);

    return this.ok(res, visits);
  }

  async visitByIdDelete(req: Request, res: Response) {
    if (!req.params.visitId) {
      return this.invalidParams(res);
    }

    await this.deps.visitService.deleteOneById(req.params.visitId);

    return this.ok(res);
  }

  async visitPost(req: Request, res: Response) {
    if (req.payload.user?.id !== req.body.userId) {
      return this.conflict(res, 'Invalid user');
    }

    const petAd = await this.deps.visitService.create(req.body);

    return this.ok(res, petAd);
  }

  async visitPatch(req: Request, res: Response) {
    if (req.params.visitId) {
      return this.invalidParams(res);
    }

    if (req.payload.user?.id !== req.body.userId) {
      return this.conflict(res, 'Invalid user');
    }

    const visit = await this.deps.visitService.getOneById(req.params.visitId);

    if (visit.userId !== req.payload.user?.id) {
      return this.forbidden(res);
    }

    const visitUpdated = await this.deps.visitService.updateOneById({
      ...req.body,
      id: req.params.visitId,
    });

    return this.ok(res, visitUpdated);
  }
}
