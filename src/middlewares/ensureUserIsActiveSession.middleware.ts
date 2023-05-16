import { NextFunction, Request, Response } from 'express';
import { client } from '../database';
import { AppError } from '../error';
import { QueryConfig, QueryResult } from 'pg';

const ensureUserIsActiveSessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { email } = req.body;

  const queryString: string = `
    SELECT "active" 
      FROM users
    WHERE "email" = $1; 
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };
  const queryRes: QueryResult = await client.query(queryConfig);

  if (queryRes.rowCount === 0) {
    throw new AppError('Wrong email/password', 401);
  }

  if (queryRes.rows[0].active === true) {
    return next();
  }
  throw new AppError('Wrong email/password', 401);
};

export default ensureUserIsActiveSessionMiddleware;
