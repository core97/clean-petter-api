import { Request, Response } from 'express';
import { container } from '@shared/infra/dependencies/container';

export const handleRequest =
  <T>(controllerInstanceName: string, methodName: keyof T) =>
  async (req: Request, res: Response) => {
    const scopedContainer = container.createScope();

    const controllerInstance = scopedContainer.resolve(controllerInstanceName);

    await controllerInstance[methodName](req, res);
  };
