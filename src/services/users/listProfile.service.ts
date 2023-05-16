import { QueryConfig, QueryResult } from 'pg';
import { TUserRes } from '../../interfaces/users.interface';
import { client } from '../../database';

const listProfileService = async (userId: number): Promise<TUserRes> => {
  const id = userId;
  const queryString: string = `
  SELECT 
    "id", "name", "email", "admin", "active"
  FROM users
  WHERE 
    "id" = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryRes: QueryResult<TUserRes> = await client.query(queryConfig);

  return queryRes.rows[0];
};

export default listProfileService;
