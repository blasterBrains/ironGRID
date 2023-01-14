// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryResult } from 'pg'
import db from './models/IrongridModel'

type Data = {
  name: string,
  admin: boolean,
  phone: string,
  short_code: number,
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

export default function handler(
  req: NextApiRequestWithUserData,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    // res.status(200).json({
    //     name: "Antknee",
    //     admin: true,
    //     phone: "7137137137",
    //     short_code: 256734,
    //   })
  } else if (req.method === 'POST') {
    const postText = 'INSERT INTO users(name, admin, phone, short_code) VALUES($1, $2, $3, $4) RETURNING short_code'
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
    const postText = 'INSERT INTO users(name, admin, phone, short_code) VALUES($1, $2, $3, $4) RETURNING short_code'
    const postValues: Data = req.body
    
    db.query(postText, postValues, (err: Error, res: QueryResult) => {
        if(err) {
            console.log(err.stack)
        } else {
            console.log(res)
        }
    })
    return res.status(200).json(req.body)
  }
//   res.status(200).json({ name: 'John Doe' })
}


// {
//     name: "Antknee",
//     admin: true,
//     phone: "7137137137",
//     short_code: 256734,
//   }