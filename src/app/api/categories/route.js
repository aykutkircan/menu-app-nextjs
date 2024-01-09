import mongoose from "mongoose";

import { Category } from "@/models/Category";

export async function GET(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    const categories = await Category.find({}).lean();

    return Response.json({ success: true, categories: categories });
  }

  const category = await Category.findOne({ _id: id }).lean();

  return Response.json({ success: true, category: category });
}

export async function POST(req, res) {
  mongoose.connect(process.env.MONGO_URL);

  const body = await req.json();

  if (!body || !body.name) {
    return Response.json(
      {
        error: "Oops! You missed some required fields.",
      },
      { status: 400 }
    );
  }
  const newCategory = new Category({ ...body });
  const createdCategory = await newCategory.save();

  return Response.json(
    { success: true, category: createdCategory },
    { status: 201 }
  );
}

export async function PUT(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();

  if (!body._id) {
    return Response.json({ success: false }, { status: 400 });
  }

  const updatedCategory = await Category.findOneAndUpdate(
    { _id: body._id },
    { ...body },
    { new: true }
  );

  return Response.json(
    { success: true, category: updatedCategory },
    { status: 201 }
  );
}

export async function DELETE(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();

  if (!body._id) {
    return Response.json({ success: false }, { status: 400 });
  }

  await Category.findOneAndDelete({ _id: body._id });

  return Response.json({ success: true }, { status: 201 });
}
