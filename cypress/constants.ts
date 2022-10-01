import { Employee } from "@prisma/client";

export const DEFAULT_EMPLOYEES: Omit<Employee, 'id'>[] = [
  {
    email: 'damilola@gmail.com',
    name: 'damilola jerugba',
    occupation: 'DEVELOPER'
  },
  {
    email: 'larry@gmail.com',
    name: 'james larry',
    occupation: 'ACCOUNTANT'
  },
  {
    email: 'ben@hotmail.com',
    name: 'ben tobi',
    occupation: 'DOCTOR'
  },
  {
    email: 'tommy@jetronmall.com',
    name: 'tommy hedgeson',
    occupation: 'ENGINEER'
  },
  {
    email: 'damilola.jerugba@jetronmall.com',
    name: 'damiisdandy',
    occupation: 'DEVELOPER'
  },
];

export const NEW_EMPLOYEE: Omit<Employee, 'id'> = {
  name: "Fiyin Jerugba",
  email: "fiyin@gmail.com",
  occupation: "DOCTOR",
}