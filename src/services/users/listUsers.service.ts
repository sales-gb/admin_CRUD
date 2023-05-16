import { QueryResult } from 'pg';
import { TUserRes } from '../../interfaces/users.interface';
import { client } from '../../database';

const listUserService = async (): Promise<Array<TUserRes>> => {
  const queryString: string = `
  SELECT 
    "id", "name", "email", "admin", "active"
  FROM 
    users;
  `;

  const queryRes: QueryResult<TUserRes> = await client.query(queryString);

  return queryRes.rows;
};

export default listUserService;
