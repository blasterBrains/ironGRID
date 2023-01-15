// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type SquareData = {
    user_id: number,
    status?: string,
    grid_id: number,
    index: number,
  }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SquareData>
) {
  if (req.method === 'GET') {
    // res.status(200).json()
  } else if (req.method === 'POST') {
    // res.status(200).json()
  }
//   res.status(200).json({ name: 'John Doe' })
}


//{
//     user_id: 2,
//     grid_id: 1,
//     index: 57,
// }