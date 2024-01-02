import { writeFile } from "fs/promises";

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get("image");
  const filename = formData.get("filename") || new Date().valueOf();
  const extension = formData.get("extension") || "jpg";

  if (!image) {
    return Response.json({ success: false }, { status: 500 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const destination = `/profile/${filename}.${extension}`;
  const path = `public${destination}`;

  await writeFile(path, buffer);
  return Response.json({
    success: true,
    destination: destination,
  });
}
