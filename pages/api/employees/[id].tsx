import { prisma } from "./index";
import { NextApiRequest, NextApiResponse } from "next";
import { HandlerFunction } from ".";

const deleteEmployee: HandlerFunction<null | string> = async (req, res) => {
  const { id } = req.query;
  try {
    await prisma.employee.delete({
      where: {
        email: id as string,
      },
    });
    res.status(204);
  } catch (err: any) {
    res.status(400).send(`Problem deleting employee, ${err.toString()}`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null | string>
) {
  switch (req.method) {
    case "DELETE":
      await deleteEmployee(req, res);
      break;
    default:
      res.status(404).send(`Request Method ${req.method} Not Found`);
  }
}
