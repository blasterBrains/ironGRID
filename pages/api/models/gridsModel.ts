import { Pool, QueryResult } from 'pg';
  

const URI = process.env.MYURI

const pool = new Pool({
  connectionString: URI,
});

interface Params {
    name: string,
    cost: number,
    size: number,
    first?: number,
    second?: number,
    third?: number,
    final?: number,
    token: string,
    inverse: boolean
}

const db = {
  query: (text: string, params: Params, callback: (err: Error, result: QueryResult<any>) => void) => {
    console.log('executed query', text);
    const request: Params = params;
    const postValues = [request.name, request.cost, request.size, request.token, request.inverse];
    return pool.query(text, postValues, callback);
  },
};
export default db;