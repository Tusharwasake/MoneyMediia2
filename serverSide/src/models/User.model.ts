import mongoose, { Document, Schema, Model } from "mongoose";

// TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema definition
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Model creation
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
