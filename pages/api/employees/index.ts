// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Employee, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export const prisma = new PrismaClient();

export type HandlerFunction<T> = (req: NextApiRequest,
  res: NextApiResponse<T>) => Promise<void>;

const getEmployees: HandlerFunction<Employee[] | string> = async (req, res) => {
  try {
    const { query } = req.query as { query: string };
    const employees = await prisma.employee.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      }
    })
    res.status(200).json(employees);
  } catch (err: any) {
    res.status(400).send(`Problem fetching employees, ${err.toString()}`);
  }
}

const createEmployee: HandlerFunction<Employee | string> = async (req, res) => {
  try {
    const user: Employee = req.body;
    const newEmployee = await prisma.employee.create({
      data: user,
    })
    res.status(201).json(newEmployee);
  } catch (err: any) {
    res.status(400).send(`Problem creating employees, ${err.toString()}`);
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Employee | Employee[] | null | string>
) {
  switch (req.method) {
    case 'GET':
      await getEmployees(req, res);
      break;
    case 'POST':
      await createEmployee(req, res);
      break;
    default:
      res.status(404).send(`Request Method ${req.method} Not Found`);
  }
}
