import format from 'pg-format';
import { TLoginReq, TLoginRes } from '../../interfaces/session.interfaces';
import { QueryResult } from 'pg';
import { Tuser } from '../../interfaces/users.interface';
import { client } from '../../database';
import { AppError } from '../../error';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createSessionService = async (payload: TLoginReq): Promise<TLoginRes> => {
  const queryString: string = `
  SELECT * 
  FROM users
  WHERE "email" = %L;
  `;
  const queryFormat: string = format(queryString, payload.email);
  const queryRes: QueryResult<Tuser> = await client.query(queryFormat);
  const user = queryRes.rows[0];

  if (queryRes.rowCount === 0) {
    throw new AppError('Wrong email/password', 401);
  }

  const comparePassword = await bcrypt.compare(payload.password, user.password);

  if (!comparePassword) {
    throw new AppError('Wrong email/password', 401);
  }

  const token: string = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN!,
      subject: user.id.toString(),
    },
  );

  return { token };
};

export default createSessionService;
