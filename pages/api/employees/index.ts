// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export const prisma = new PrismaClient();

export type HandlerFunction<T> = (req: NextApiRequest,
  res: NextApiResponse<T>) => void;

const getEmployees: HandlerFunction<User[] | string> = async (req, res) => {
  const { query } = req.query as { query: string };
  try {
    const employees = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      }
    })
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).send("Problem fetching employees");
  }
}

const createEmployee: HandlerFunction<User | string> = async (req, res) => {
  const user: User = req.body;
  try {
    const newUser = await prisma.user.create({
      data: user,
    })
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send("Problem creating employee");
  }
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | User[] | null | string>
) {
  switch (req.method) {
    case 'GET':
      getEmployees(req, res);
      break;
    case 'POST':
      createEmployee(req, res);
      break;
    default:
      res.status(404).send(`Request Method ${req.method} Not Found`);
  }
}
