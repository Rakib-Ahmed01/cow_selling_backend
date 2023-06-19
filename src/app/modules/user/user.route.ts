import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "./user.controller";
import { validateRequest } from "../../../utils/validateRequest";
import { updateUserZodSchema } from "./user.validation";

export const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(getSingleUser)
  .patch(validateRequest(updateUserZodSchema), updateUser)
  .delete(deleteUser);

userRouter.route("/").get(getAllUsers);
