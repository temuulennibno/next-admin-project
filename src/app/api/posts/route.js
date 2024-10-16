import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const prisma = new PrismaClient();
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;
  const size = url.searchParams.get("size") ? Number(url.searchParams.get("size")) : 20;

  const totalElements = await prisma.post.count();
  const totalPages = Math.ceil(totalElements / size);
  const items = await prisma.post.findMany({ take: size, skip: (1 - page) * size });

  return NextResponse.json({
    items,
    pageInfo: {
      totalPages,
      totalElements,
      page,
      size,
    },
  });
};
