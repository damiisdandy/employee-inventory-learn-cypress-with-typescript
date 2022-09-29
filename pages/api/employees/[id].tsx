import { prisma } from "./index";
import { NextApiRequest, NextApiResponse } from "next";
import { HandlerFunction } from ".";

const deleteEmployee: HandlerFunction<null | string> = async (req, res) => {
  const { id } = req.query;
  try {
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(204).json(null);
  } catch (err) {
    res.status(400).send("Problem deleting employee");
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<null | string>
) {
  switch (req.method) {
    case "DELETE":
      deleteEmployee(req, res);
      break;
    default:
      res.status(404).send(`Request Method ${req.method} Not Found`);
  }
}
