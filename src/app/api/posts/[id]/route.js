import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import fs from "fs/promises";

const filePath = "./data/posts.json";

export const GET = async (_, { params }) => {
  const { id } = params;

  if (!id) return NextResponse.json({ message: "id хоосон байж болохгүй" }, { status: 400 });
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(fileData);

    const post = posts.find((post) => post.id === id);

    if (!post) return NextResponse.json({ message: "Мэдээ олдсонгүй" }, { status: 404 });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Алдаа гарлаа", error: error.message }, { status: 500 });
  }
};
