// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { QueryResult } from 'pg'
// import db from './models/usersModel'
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';
import Error from 'next/error';

interface Data {
  name: string;
  admin: boolean;
  phone: string;
  short_code: number;
}
interface NextApiRequestWithUserData extends NextApiRequest {
  body: {
    name: string,
    admin: boolean,
    phone: string,
    short_code: number,
  }
}

interface NextApiResponseWithUserData extends NextApiResponse {
  body: {
    id: number,
    name: string,
    admin: boolean,
    phone: string,
    short_code: number,
  }
}

export default async function userHandler(
  req: NextApiRequestWithUserData,
  res: NextApiResponseWithUserData
) {
    if (req.method === 'GET') {
      const { phone } = req.body;
      try {
        const user = await prisma.users.findUnique({
          where: {
            phone,
          }
        });
        return res.status(200).json(user);
      } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError) {
            console.log('Error occured during Get request to Users Table: ', error.message)
          }
          if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            console.log('Error occured during Get request to Users Table: ', error.message)
          }
          console.log('error: ', error)
          throw error;
      }
    } else if (req.method === 'POST') {
        const data = req.body;
        try {
          const newUser: Data = await prisma.users.create({
            data,
          })
          console.log('newUser: ', newUser);
          return res.status(200).json(newUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              console.log('Error occured during Get request to Users Table: ', error.code, error.message)
            }
            throw error;
        }
    } else if (req.method === 'DELETE') {
        const { phone } = req.body;
        try {
          const deletedUser: Data = await prisma.users.delete({
            where: {
              phone,
            }
          })
          console.log('deletedUser: ', deletedUser);
          return res.status(200).json(deletedUser);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              console.log('Error occured during Get request to Users Table: ', error.code, error.message)
            }
            throw error;
        }
    }
}

