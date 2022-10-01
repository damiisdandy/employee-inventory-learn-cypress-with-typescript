import { prisma } from '../../pages/api/employees';
import { DEFAULT_EMPLOYEES } from '../constants';


export default async function seedDB() {
  return await prisma.employee.createMany({
    data: DEFAULT_EMPLOYEES,
  });
};