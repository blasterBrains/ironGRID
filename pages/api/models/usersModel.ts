import { Pool, QueryResult } from 'pg';
  

const URI = process.env.MYURI

const pool = new Pool({
  connectionString: URI,
});

interface Params {
  name: string,
  admin: boolean,
  phone: string,
  short_code: number,
}

const db = {
  query: (text: string, params?: Params, callback?: (err: Error, result: QueryResult<any>) => void) => {
    console.log('executed query', text);
    // const request: Params = params;
    if (params && callback) {
      const {name, admin, phone, short_code} = params;
      const postValues = [name, admin, phone, short_code]
      return pool.query(text, postValues, callback);
    } else if (callback) {
      return pool.query(text, callback);
    }
    // const postValues = [request.name, request.admin, request.phone, request.short_code];
  },
};
export default db;