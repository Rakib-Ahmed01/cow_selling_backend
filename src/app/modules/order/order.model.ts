import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      required: [true, "Cow is required"],
      ref: "Cow",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      required: [true, "Buyer is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<TOrder>("Order", orderSchema);
