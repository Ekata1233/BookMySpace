import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { connectToDatabase } from "@/lib/db";

const SECRET_KEY = process.env.JWT_SECRET as string;
if (!SECRET_KEY) {
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
      return { error: "Internal Server Error 6", status: 500 };
    }
  }

  static async login(email: string, password: string) {
    try {
      await connectToDatabase();

      const user = await User.findOne({ email });
      // if (!user) return { error: "User not found", status: 404 };

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword)
        return { error: "Invalid credentials2", status: 401 };

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" },
      );

      return {
        message: "Login successful",
        token,
        user: { name: user.name, email: user.email, id: user._id },
      };
    } catch (error) {
      // return { error: "Internal Server Error 7", status: 500 };
    }
  }

  static async getAllUsers() {
    try {
      await connectToDatabase();

      const users = await User.find({}, { password: 0 }); // Exclude password field
      return { users, status: 200 };
    } catch (error) {
      console.error("Get All Users Error:", error);
      return { error: "Internal Server Error 8", status: 500 };
    }
  }

  static async getUserById(id: string) {
    try {
      await connectToDatabase();

      const user = await User.findById(id, { password: 0 }); // exclude password
      if (!user) {
        return { error: "User not found", status: 404 };
      }

      return { user, status: 200 };
    } catch (error) {
      console.error("Get User By ID Error:", error);
      return { error: "Internal Server Error 9", status: 500 };
    }
  }

  static async updateUser(id: string, data: Partial<IUser>) {
    try {
      await connectToDatabase();

      const updatedUser = await User.findByIdAndUpdate(id, data, {
        new: true,
        select: "-password", // exclude password from response
      });

      if (!updatedUser) {
        return { error: "User not found", status: 404 };
      }

      return { message: "User updated", user: updatedUser, status: 200 };
    } catch (error) {
      console.error("Update User Error:", error);
      return { error: "Internal Server Error 10", status: 500 };
    }
  }

  static async deleteUser(id: string) {
    try {
      await connectToDatabase();

      const deletedUser = await User.findByIdAndDelete(id, { select: "-password" });
      if (!deletedUser) {
        return { error: "User not found", status: 404 };
      }

      return { message: "User deleted", user: deletedUser, status: 200 };
    } catch (error) {
      console.error("Delete User Error:", error);
      return { error: "Internal Server Error 11", status: 500 };
    }
  }

}
