import mongoose from "mongoose";
import { User } from "@/modals/User";

export async function POST(req, res) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);

  const newUser = new User({ ...body });
  const createdUser = await newUser.save();

  return Response.json({ user: createdUser });
}
