import format from 'pg-format';
import { TUserRes, TUserUpdate } from '../../interfaces/users.interface';
import { object } from 'zod';
import { QueryConfig, QueryResult } from 'pg';
import { TUser } from '../../__tests__/mocks/interfaces';
import { client } from '../../database';
import { resUserSchema } from '../../schemas/users.schemas';

const updateUserService = async (
  payload: TUserUpdate,
  userId: number,
): Promise<TUserRes> => {
  const queryString: string = format(
    `
    UPDATE users
      SET(%I) = ROW(%L)
    WHERE
      "id" = $1
    RETURNING *; 
    `,
    Object.keys(payload),
    Object.values(payload),
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryRes: QueryResult<TUser> = await client.query(queryConfig);

  const user: TUserRes = resUserSchema.parse(queryRes.rows[0]);

  return user;
};

export default updateUserService;
