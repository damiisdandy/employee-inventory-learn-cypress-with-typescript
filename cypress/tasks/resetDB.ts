import { prisma } from '../../pages/api/employees';


export default async function resetDB() {
  return prisma.employee.deleteMany({});
};