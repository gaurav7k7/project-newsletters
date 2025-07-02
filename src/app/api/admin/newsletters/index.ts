import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  const newsletters = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
    include: { topic: true },
  });
  return NextResponse.json(newsletters);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, content, topicId } = await req.json();
  const slug = slugify(title, { lower: true });

  try {
    const newsletter = await prisma.newsletter.create({
      data: {
        title,
        slug,
        content,
        topic: { connect: { id: topicId } },
      },
    });
    return NextResponse.json(newsletter, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Creation failed" }, { status: 400 });
  }
}
