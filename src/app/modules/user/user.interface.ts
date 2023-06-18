import { Model } from "mongoose";

// I've used union instead of enum because using Typescript enum is not considred as best practice
type Role = "seller" | "buyer";

export type TUser = {
  name: string;
  phoneNumber: string;
  role: Role;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  budget: number;
  income: number;
};

export const UserModel = Model<TUser>;
