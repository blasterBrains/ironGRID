// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import Error from 'next/error';
import type {
  NextApiRequestWithUserData,
  NextApiResponseWithUserData,
} from '../../common/types';

export default async function userHandler(
  req: NextApiRequestWithUserData,
  res: NextApiResponseWithUserData
) {
  if (req.method === 'GET') {
    const id = req.query.id;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        console.log(
          'Error occured during Get request to Users Table: ',
          error.message
        );
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(
          'Error occured during Get request to Users Table: ',
          error.message
        );
      }
      console.log('error: ', error);
      throw error;
    }
  } else if (req.method === 'POST') {
    const data = req.body;
    try {
      const newUser: Data = await prisma.user.create({
        data,
      });
      console.log('newUser: ', newUser);
      return res.status(200).json(newUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(
          'Error occured during Get request to Users Table: ',
          error.code,
          error.message
        );
      }
      throw error;
    }
  } else if (req.method === 'DELETE') {
    const id = req.query.id;
    try {
      const deletedUser: Data = await prisma.user.delete({
        where: {
          id,
        },
      });
      console.log('deletedUser: ', deletedUser);
      return res.status(200).json(deletedUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(
          'Error occured during Get request to Users Table: ',
          error.code,
          error.message
        );
      }
      throw error;
    }
  }
}
