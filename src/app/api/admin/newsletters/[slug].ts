import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const newsletter = await prisma.newsletter.findUnique({
    where: { slug: params.slug },
    include: { topic: true },
  });

  return newsletter
    ? NextResponse.json(newsletter)
    : NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, content, topicId } = await req.json();

  try {
    const updated = await prisma.newsletter.update({
      where: { slug: params.slug },
      data: {
        title,
        content,
        topic: { connect: { id: topicId } },
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await prisma.newsletter.delete({ where: { slug: params.slug } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
