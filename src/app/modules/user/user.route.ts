import express from "express";
import { deleteUser, getAllUsers, getSingleUser } from "./user.controller";

export const userRouter = express.Router();

userRouter.route("/:id").get(getSingleUser).delete(deleteUser);

userRouter.route("/").get(getAllUsers);
