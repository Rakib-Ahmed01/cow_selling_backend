import express from "express";
import {
  createCow,
  deleteCow,
  getAllCows,
  getSingleCow,
  updateCow,
} from "./cow.controller";
import { validateRequest } from "../../../utils/validateRequest";
import { createCowZodSchema, updateCowZodSchema } from "./cow.validation";

export const cowRouter = express.Router();

cowRouter
  .route("/:id")
  .get(getSingleCow)
  .patch(validateRequest(updateCowZodSchema), updateCow)
  .delete(deleteCow);

cowRouter
  .route("/")
  .get(getAllCows)
  .post(validateRequest(createCowZodSchema), createCow);
