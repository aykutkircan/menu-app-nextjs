import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import clientPromise from "@/libs/mongoAdapter";
import { User } from "@/modals/User";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email }).lean();

        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
