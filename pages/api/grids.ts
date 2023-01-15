// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { QueryResult } from 'pg'
import db from './models/gridsModel'
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

export default async function gridHandler(
  req: NextApiRequestWithGridData,
  res: NextApiResponsetWithGridData
) {
  if (req.method === 'POST') {
    const data = req.body;
        try {
          const newGrid = await prisma.grids.create({
            data,
          })
          console.log('newGrid: ', newGrid);
          return res.status(200).json(newGrid);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
              console.log('Error occured during Get request to grids Table: ', error.code, error.message)
            }
            throw error;
        }
  } else if (req.method === 'GET') {
    const { token } = req.body;
      try {
        const grid = await prisma.grids.findUnique({
          where: {
            token,
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
    const { token } = req.body;
        try {
          const deletedGrid = await prisma.grids.delete({
            where: {
              token,
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