import { Schema, model } from "mongoose";
import { TCow } from "./cow.interface";
import { breeds, categories, labels, locations } from "./cow.contants";

const cowSchema = new Schema<TCow>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      enum: {
        values: locations,
        message: `Location must be - ${locations.join(" | ")}`,
      },
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
      enum: {
        values: breeds,
        message: `Breed must be - ${breeds.join(" | ")}`,
      },
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },
    label: {
      type: String,
      enum: {
        values: labels,
        message: `Label must be - ${labels.join(" | ")}`,
      },
      default: "for sale",
    },
    category: {
      type: String,
      enum: {
        values: categories,
        message: `Category must be - ${categories.join(" | ")}`,
      },
      required: [true, "Category is required"],
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: [true, "Seller is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Cow = model<TCow>("Cow", cowSchema);

export default Cow;
