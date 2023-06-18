import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      firstName: {
        type: String,
        required: [true, "First name is required"],
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    role: {
      type: String,
      enum: {
        values: ["buyer", "seller"],
        message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
      },
      required: [true, "Role is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password must be atleast 6 characters long"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    budget: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model<TUser>("User", userSchema);

export default User;
