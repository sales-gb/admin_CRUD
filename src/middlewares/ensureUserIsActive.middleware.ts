import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../error';

const ensureUserIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { id } = req.params;

  const queryString: string = `
    SELECT "active" 
      FROM users
    WHERE "id" = $1; 
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryRes: QueryResult = await client.query(queryConfig);

  if (queryRes.rows[0].active === true) {
    throw new AppError('User already active', 400);
  }

  return next();
};

export default ensureUserIsActiveMiddleware;
