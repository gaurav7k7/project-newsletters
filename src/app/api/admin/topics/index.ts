import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const topics = await prisma.topic.findMany();
  return NextResponse.json(topics);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  const slug = slugify(name, { lower: true });

  try {
    const topic = await prisma.topic.create({ data: { name, slug } });
    return NextResponse.json(topic, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create topic" },
      { status: 400 }
    );
  }
}
