// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';
import { Prisma } from '@prisma/client';

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
    id?: number,
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

interface NextApiResponsetWithGridData extends NextApiResponse {
  body: {
    id: number,
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

function TokenGenerator() {
    let token = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVQXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      token += characters.charAt(Math.floor(Math.random() * charactersLength));      
    }
    console.log('this is token: ', token);
    return token;
}

async function TokenDBCheck(token: string) {
  const dbQuery = await prisma.grids.findFirst({
    where: {
      token,
    }
  });
  console.log('this is result of dbQuery in TokenDBCheck: ', dbQuery);
  return dbQuery;
}

export default async function GridHandler(
  req: NextApiRequestWithGridData,
  res: NextApiResponsetWithGridData
) {
  if (req.method === 'POST') {
    let token = TokenGenerator();
    let dbCheck = await TokenDBCheck(token);
    while (dbCheck != null) {
      token = TokenGenerator();
      dbCheck = await TokenDBCheck(token);
    }
    const dataWithoutToken = req.body;
    const data = {...dataWithoutToken, token}
    try {
      const newGrid = await prisma.grids.create({
        data,
      })
      console.log('newGrid: ', newGrid);
      return res.status(200).json(newGrid);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.log('Error occured during Get request to grids Table: ', error.code, error.message)
          res.status(Number(error.code)).end
        }
        throw error;
    }
  } else if (req.method === 'GET') {
    const id = Number(req.query.id);
    try {
      const grid = await prisma.grids.findFirst({
        where: {
          id,
        }
      });
      console.log(grid);
      return res.status(200).json(grid);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientValidationError) {
          console.log('Error occured during Get request to grids Table: ', error.message)
        }
        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
          console.log('Error occured during Get request to grids Table: ', error.message)
        }
        console.log('error: ', error)
        throw error;
    }
  } else if (req.method === 'DELETE') {
    const id = Number(req.query.id);
    try {
      const deletedGrid = await prisma.grids.delete({
        where: {
          id,
        }
      })
      console.log('deletedGrid: ', deletedGrid);
      return res.status(200).json(deletedGrid);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.log('Error occured during Get request to Grids Table: ', error.code, error.message)
        }
        throw error;
    }
  }
  
}

    // {
    //   name: "anthony",
    //   cost: 5,
    //   size: 100,
    //   token: "IVWQ",
    //   inverse: false,
    //   }