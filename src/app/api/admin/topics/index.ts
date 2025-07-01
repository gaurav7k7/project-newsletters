import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;
    try {
      await prisma.topic.create({
        data: { name },
      });
      res.status(201).json({ message: "created" });
    } catch (error) {
      res.status(500).json({ error: "failed to create topic" });
    }
  } else {
    res.status(405).end();
  }
}
