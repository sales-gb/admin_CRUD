import format from 'pg-format';
import { TUserReq, TUserRes } from '../../interfaces/users.interface';
import { QueryResult } from 'pg';
import { client } from '../../database';
import { resUserSchema } from '../../schemas/users.schemas';
import * as bcrypt from 'bcryptjs';

const createUserService = async (userData: TUserReq): Promise<TUserRes> => {
  userData.password = await bcrypt.hash(userData.password, 10);
  const queryString: string = format(
    `
    INSERT INTO
      users(%I)
    VALUES 
      (%L)
    RETURNING *;
      `,
    Object.keys(userData),
    Object.values(userData),
  );

  const queryRes: QueryResult<TUserRes> = await client.query(queryString);

  const newUser = resUserSchema.parse(queryRes.rows[0]);

  return newUser;
};

export default createUserService;
