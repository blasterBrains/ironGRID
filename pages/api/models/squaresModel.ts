import { Pool, QueryResult } from 'pg';
  

const URI = process.env.MYURI

const pool = new Pool({
  connectionString: URI,
});

interface Params {
  user_id: string,
  grid_id: boolean,
  index: number,
}

const db = {
  query: (text: string, params: Params, callback: (err: Error, result: QueryResult<any>) => void) => {
    console.log('executed query', text);
    const {name, admin, phone, short_code} = params;
    const postValues = [name, admin, phone, short_code]
    return pool.query(text, postValues, callback);
  },
};
export default db;