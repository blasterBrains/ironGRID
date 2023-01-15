// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryResult } from 'pg'
import db from './models/gridsModel'

type GridData = {
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

interface NextApiRequestWithGridData extends NextApiRequest {
  body: {
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
}

export default function handler(
  req: NextApiRequestWithGridData,
  res: NextApiResponse<GridData>
) {
  if (req.method === 'POST') {
    const postText = 'INSERT INTO grids(name, cost, size, token, inverse) VALUES($1, $2, $3, $4, $5) RETURNING short_code'
    const postValues: GridData = req.body
    
    db.query(postText, postValues, (err: Error, res: QueryResult) => {
        if(err) {
            console.log(err.stack)
        } else {
            console.log(res)
        }
    })
    return res.status(200).json(req.body)
  } else if (req.method === 'GET') {
    // res.status(200).json('')
  } else if (req.method === 'DELETE') {
    const postText = 'DELETE FROM grids'
    const postValues: GridData = req.body
    
    db.query(postText, postValues, (err: Error, res: QueryResult) => {
        if(err) {
            console.log(err.stack)
        } else {
            console.log(res)
        }
    })
    return res.status(200).json(req.body)
  }
  // res.status(200).json({ name: 'John Doe' })
}

    // {
    //   name: "anthony",
    //   cost: 5,
    //   size: 100,
    //   token: "IVWQ",
    //   inverse: false,
    //   }