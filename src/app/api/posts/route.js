import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use fs/promises for async operations
const filePath = "./data/posts.json";

export const GET = async (req) => {
  const url = new URL(req.url);
  const page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;
  const size = url.searchParams.get("size") ? Number(url.searchParams.get("size")) : 20;

  const fileData = await fs.readFile(filePath, "utf-8");
  const rawData = JSON.parse(fileData);

  const totalPages = Math.ceil(rawData.length / size);

  return NextResponse.json({
    items: rawData.slice((1 - page) * size, size),
    pageInfo: {
      totalPages,
      page,
      size,
    },
  });
};
