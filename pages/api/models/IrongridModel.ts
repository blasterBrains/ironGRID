import { Pool } from 'pg';

const myURI =
  'postgres://btlouyzd:eWHHMZUqi4VTT2mrAHfzVk-7PLjLMvmc@mahmud.db.elephantsql.com/btlouyzd';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text: string, params: Array<string>, callback: () => void) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
