// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import type {
  NextApiRequestWithSquareData,
  NextApiResponseWithSquareData,
} from '../../common/types';

export default async function handler(
  req: NextApiRequestWithSquareData,
  res: NextApiResponseWithSquareData
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      const square = await prisma.square.findFirst({
        where: {
          id,
        },
      });
      return res.status(200).json(square);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        console.log(
          'Error occured during Get request to squares Table: ',
          error.message
        );
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(
          'Error occured during Get request to squares Table: ',
          error.message
        );
      }
      console.log('error: ', error);
      throw error;
    }
  } else if (req.method === 'POST') {
    const data = req.body;
    try {
      const newsquare = await prisma.square.create({
        data,
      });
      console.log('newsquare: ', newsquare);
      return res.status(200).json(newsquare);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(
          'Error occured during Get request to squares Table: ',
          error.code,
          error.message
        );
      }
      throw error;
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const deletedsquare = await prisma.square.delete({
        where: {
          id,
        },
      });
      console.log('deletedsquare: ', deletedsquare);
      return res.status(200).json(deletedsquare);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(
          'Error occured during Get request to squares Table: ',
          error.code,
          error.message
        );
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
