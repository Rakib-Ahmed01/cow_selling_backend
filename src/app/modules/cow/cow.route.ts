import express from "express";
import {
  createCow,
  deleteCow,
  getAllCows,
  getSingleCow,
} from "./cow.controller";
import { validateRequest } from "../../../utils/validateRequest";
import { createCowZodSchema } from "./cow.validation";

export const cowRouter = express.Router();

cowRouter.route("/:id").get(getSingleCow).patch().delete(deleteCow);

cowRouter
  .route("/")
  .get(getAllCows)
  .post(validateRequest(createCowZodSchema), createCow);
