import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (req.method === "PUT") {
    const { name } = req.body;
    try {
      await prisma.topic.update({
        where: { name: slug as string },
        data: { name },
      });
      res.status(200).json({ message: "updated" });
    } catch (error) {
      res.status(500).json({ error: "failed to update topic" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.topic.delete({
        where: { name: slug as string },
      });
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      res.status(500).json({ error: "failed to delete topic" });
    }
  } else {
    res.status(405).end();
  }
}
