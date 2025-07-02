import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const topic = await prisma.topic.findUnique({ where: { slug: params.slug } });
  return topic
    ? NextResponse.json(topic)
    : NextResponse.json({ message: "Not found" }, { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();

  try {
    const topic = await prisma.topic.update({
      where: { slug: params.slug },
      data: { name },
    });
    return NextResponse.json(topic);
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
    await prisma.topic.delete({ where: { slug: params.slug } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
