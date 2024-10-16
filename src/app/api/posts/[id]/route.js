import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (_, { params }) => {
  const { id } = params;

  if (!id) return NextResponse.json({ message: "id хоосон байж болохгүй" }, { status: 400 });
  try {
    const prisma = new PrismaClient();
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) return NextResponse.json({ message: "Мэдээ олдсонгүй" }, { status: 404 });

    return NextResponse.json({ ...post, id: post.uid });
  } catch (error) {
    return NextResponse.json({ message: "Алдаа гарлаа", error: error.message }, { status: 500 });
  }
};
