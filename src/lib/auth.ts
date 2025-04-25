// /lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import dbConnect from "./db";
import Vendor from "../models/vendor";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Vendor Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const vendor = await Vendor.findOne({ workEmail: credentials?.email });

        if (!vendor) {
          throw new Error("No vendor found with this email");
        }

        return {
          id: vendor._id.toString(),
          email: vendor.workEmail,
          name: vendor.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/vendor/registration",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
