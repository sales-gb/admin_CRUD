import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';

const ensureUserHasPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const admin = res.locals.token.admin;
  const idAdmin = res.locals.token.id;
  const { id } = req.params;

  if (!admin && parseInt(idAdmin) !== parseInt(id)) {
    throw new AppError('Insufficient Permission', 403);
  }
  return next();
};

export default ensureUserHasPermission;
