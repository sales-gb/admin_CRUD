import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { TUser } from '../__tests__/mocks/interfaces';
import { client } from '../database';
import { AppError } from '../error';

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const userId: number = Number(req.params.id);

  const queryString: string = `
    SELECT *
    FROM users
    WHERE 
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };
  const queryRes: QueryResult<TUser> = await client.query(queryConfig);

  if (queryRes.rowCount === 0) {
    throw new AppError('User not found', 404);
  }

  res.locals.user = queryRes.rows[0];

  return next();
};

export default ensureUserExistsMiddleware;
