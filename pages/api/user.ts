// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';
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
          'Error occured during Get request to User Table: ',
          error.message
        );
      }
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.log(
          'Error occured during Get request to User Table: ',
          error.message
        );
      }
      console.log('error: ', error);
      throw error;
    }
  } else if (req.method === 'POST') {
    const data = req.body;
    const { phone } = data;
    console.log('data: ', data, 'phoooone: ', phone);
    try {
      const userCheck = await prisma.user.findFirst({
        where: {
          phone,
        },
      });
      console.log('userCheck: ', userCheck);
      if (userCheck !== null) return res.status(200).json(userCheck);
      const newUser = await prisma.user.create({
        data,
      });
      console.log('newUser: ', newUser);
      return res.status(200).json(newUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(
          'Error occured during Post request to User Table: ',
          error.code,
          error.message
        );
      }
      throw error;
    }
  } else if (req.method === 'DELETE') {
    const id = req.query.id;
    try {
      const deletedUser = await prisma.user.delete({
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