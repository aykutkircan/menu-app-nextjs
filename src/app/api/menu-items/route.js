import mongoose from "mongoose";

import { Category } from "@/models/Category";
import { MenuItem } from "@/models/MenuItem";

export async function GET(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    const menuItems = await MenuItem.find({}).lean();

    return Response.json({ success: true, menuItems: menuItems });
  }

  const menuItem = await MenuItem.findOne({ _id: id }).lean();

  return Response.json({ success: true, menuItem: menuItem });
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
  const newMenuItem = new MenuItem({ ...body });
  const createdMenuItem = await newMenuItem.save();

  return Response.json(
    { success: true, category: createdMenuItem },
    { status: 201 }
  );
}

export async function PUT(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();

  if (!body._id) {
    return Response.json({ success: false }, { status: 400 });
  }

  const updatedMenuItem = await MenuItem.findOneAndUpdate(
    { _id: body._id },
    { ...body },
    { new: true }
  );

  return Response.json(
    { success: true, category: updatedMenuItem },
    { status: 201 }
  );
}

export async function DELETE(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();

  if (!body._id) {
    return Response.json({ success: false }, { status: 400 });
  }

  await MenuItem.findOneAndDelete({ _id: body._id });

  return Response.json({ success: true }, { status: 201 });
}
