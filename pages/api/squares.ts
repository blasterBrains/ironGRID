// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';

interface SquareData {
    user_id: number;
    status?: string;
    grid_id: number;
    index: number;
  }

interface NextApiRequestWithSquareData extends NextApiRequest {
  body: {
    user_id: number;
    status?: string;
    grid_id: number;
    index: number;
  }
}

interface NextApiResponseWithSquareData extends NextApiResponse {
  body: {
    id: number;
    user_id: number;
    status?: string;
    grid_id: number;
    index: number;
  }
}

export default async function handler(
  req: NextApiRequestWithSquareData,
  res: NextApiResponseWithSquareData
) {
  if (req.method === 'GET') {
      const { grid_id, index } = req.body;
      try {
        const square = await prisma.squares.findMany({
          where: {
            grid_id,
            index,
          }
        });
        return res.status(200).json(square);
      } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError) {
            console.log('Error occured during Get request to squares Table: ', error.message)
          }
          if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            console.log('Error occured during Get request to squares Table: ', error.message)
          }
          console.log('error: ', error)
          throw error;
      }
    } else if (req.method === 'POST') {
        const data = req.body;
        try {
          const newsquare = await prisma.squares.create({
            data,
          })
          console.log('newsquare: ', newsquare);
          return res.status(200).json(newsquare);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              console.log('Error occured during Get request to squares Table: ', error.code, error.message)
            }
            throw error;
        }
    } else if (req.method === 'DELETE') {
        const { grid_id, index } = req.body;
        try {
          const deletedsquare = await prisma.squares.deleteMany({
            where: {
              grid_id,
              index
            }
          })
          console.log('deletedsquare: ', deletedsquare);
          return res.status(200).json(deletedsquare);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              console.log('Error occured during Get request to squares Table: ', error.code, error.message)
            }
            throw error;
        }
    }
}
//{
//     square_id: 2,
//     grid_id: 1,
//     index: 57,
// }