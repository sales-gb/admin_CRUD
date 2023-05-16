import { QueryConfig, QueryResult } from 'pg';
import { TUserRes } from '../../interfaces/users.interface';
import { client } from '../../database';
import { resUserSchema } from '../../schemas/users.schemas';

const recoverUserService = async (id: number): Promise<TUserRes> => {
  const queryString: string = `
      UPDATE users
        SET "active" = true
      WHERE "id" = $1
      RETURNING *;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryRes: QueryResult<TUserRes> = await client.query(queryConfig);

  const updatedUser = resUserSchema.parse(queryRes.rows[0]);

  return updatedUser;
};

export default recoverUserService;
