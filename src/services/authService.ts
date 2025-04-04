import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { connectToDatabase } from "@/lib/db";

const SECRET_KEY = process.env.JWT_SECRET as string;if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export class AuthService {
  static async signup(userData: Partial<IUser>) {
    try {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return { error: "User already exists", status: 400 };
      }

      const newUser = new User(userData);
      await newUser.save();

      return { message: "User created successfully", status: 201 };
    } catch (error) {
      console.error("Signup Error:", error);
      return { error: "Internal Server Error", status: 500 };
    }
  }

  static async login(email: string, password: string) {
    try {
      await connectToDatabase();

      const user = await User.findOne({ email });
      if (!user) return { error: "User not found", status: 404 };

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) return { error: "Invalid credentials", status: 401 };

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { message: "Login successful", token, user: { name: user.name, email: user.email, id: user._id } };
    } catch (error) {
      console.error("Login Error:", error);
      return { error: "Internal Server Error", status: 500 };
    }
  }
}
