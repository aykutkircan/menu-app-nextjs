import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, res) {
  mongoose.connect(process.env.MONGO_URL);

  const userSessionData = await getServerSession(authOptions);
  const userEmail = userSessionData.user.email;

  const user = await User.findOne({ email: userEmail })
    .select("-password -__v")
    .lean();

  if (!user) {
    Response.json({ success: "false", user: null }, { status: 500 });
  }
  return Response.json({ success: "true", user });
}

export async function PUT(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  try {
    const requestBody = await req.json();

    const user = await User.findOne({ email: requestBody.userEmail });
    if (!user) {
      Response.json({ success: "false", user: null });
    }

    user.name = requestBody.userName;
    user.image = requestBody.userImage;

    await user.save();

    return Response.json({ success: "true", user });
  } catch (error) {
    return Response.json({ success: "false", user: null }, { status: 500 });
  }
}
