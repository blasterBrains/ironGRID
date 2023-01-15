// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryResult } from 'pg'
import db from './models/usersModel'
import prisma from '../../lib/prisma';


interface Data {
  name: string;
  admin: boolean;
  phone: string;
  short_code: number;
}
// const text = 'INSERT INTO users(name, admin, phone, short_code) VALUES($1, $2, $3, $4) RETURNING short_code'
// const values = ['Antknee', true, '8433493827', 849358];
interface NextApiRequestWithUserData extends NextApiRequest {
  body: {
    name: string,
    admin: boolean,
    phone: string,
    short_code: number,
  }
}

export default async function handler(
  req: NextApiRequestWithUserData,
  res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
      const postText = 'SELECT * FROM users'
      const postValues: Data = req.body
      
      db.query(postText, postValues, (err: Error, res: QueryResult) => {
          if(err) {
              console.log(err.stack)
          } else {
              console.log(res)
          }
      })
      return res.status(200).json(req.body)
    } else if (req.method === 'POST') {
      
      const Users = await prisma.users.create({
        data: {
          name:'Buliah',
          admin: true,
          phone: '7137132137',
          short_code: 256343
        },
      })
      // const postText = 'INSERT INTO users(name, admin, phone, short_code) VALUES($1, $2, $3, $4) RETURNING short_code'
      // const postValues: Data = req.body
      
      // db.query(postText, postValues, (err: Error, res: QueryResult) => {
      //     if(err) {
      //         console.log(err.stack)
      //     } else {
      //         console.log(res)
      //     }
      // })
      // return res.status(200).json(req.body)
    } else if (req.method === 'DELETE') {
      // const postText = 'DELETE FROM users'
      // const postValues: Data = req.body
      
      // db.query(postText, (err: Error, res: QueryResult) => {
      //     if(err) {
      //         console.log(err.stack)
      //     } else {
      //         console.log(res)
      //     }
      // })
      // return res.status(200).json(req.body)
    }
}

// post request
// {
//   "name": "Buliah",
//   "admin": true,
//   "phone": "7137132137",
//   "short_code": 256343
// }

