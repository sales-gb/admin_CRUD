import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';

const ensureUserIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const admin = res.locals.token.admin;

  if (admin !== true) {
    throw new AppError('Insufficient Permission', 403);
  }

  return next();
};

export default ensureUserIsAdminMiddleware;
