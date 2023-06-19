import { Schema } from "mongoose";

export type TOrder = {
  cow: Schema.Types.ObjectId;
  buyer: Schema.Types.ObjectId;
};
