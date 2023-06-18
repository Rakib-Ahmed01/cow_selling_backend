import express from "express";
import { getAllUsers } from "./user.controller";

export const userRouter = express.Router();

userRouter.route("/:id").get();

userRouter.route("/").get(getAllUsers);
