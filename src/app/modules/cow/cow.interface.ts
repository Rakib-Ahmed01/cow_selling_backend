import { Schema } from "mongoose";
import { breeds, categories, labels, locations } from "./cow.contants";

export type Breed = (typeof breeds)[number];
export type Location = (typeof locations)[number];
export type Label = (typeof labels)[number];
export type Category = (typeof categories)[number];

export type TCow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Schema.Types.ObjectId;
};
