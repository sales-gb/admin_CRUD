import { QueryConfig } from 'pg';
import { client } from '../../database';

const softDeleteUserService = async (id: number): Promise<Response | void> => {
  const queryString: string = `
    UPDATE users
      SET "active" = false
    WHERE "id" = $1; 
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
};

export default softDeleteUserService;
