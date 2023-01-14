// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GridData>
) {
  if (req.method === 'POST') {
    res.status(200).json({
      name: "anthony",
      cost: 5,
      size: 100,
      token: "IVWQ",
      inverse: false,
      })
  } else if (req.method === 'GET') {
    // res.status(200).json('')
  }
  // res.status(200).json({ name: 'John Doe' })
}
