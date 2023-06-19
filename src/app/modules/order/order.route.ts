import express from "express";
import { createOrder } from "./order.controller";
import { validateRequest } from "../../../utils/validateRequest";
import { createOrderZodSchema } from "./order.validation";

export const orderRouter = express.Router();

orderRouter
  .route("/")
  .get()
  .post(validateRequest(createOrderZodSchema), createOrder);
