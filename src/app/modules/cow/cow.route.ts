import express from "express";
import { createCow, getAllCows } from "./cow.controller";
import { validateRequest } from "../../../utils/validateRequest";
import { createCowZodSchema } from "./cow.validation";

export const cowRouter = express.Router();

cowRouter.route("/:id").get().delete().patch();

cowRouter
  .route("/")
  .get(getAllCows)
  .post(validateRequest(createCowZodSchema), createCow);
