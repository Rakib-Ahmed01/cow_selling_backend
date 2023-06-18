import express from "express";
import { createUser } from "../user/user.controller";
import { createUserZodSchema } from "../user/user.validation";
import { validateRequest } from "../../../utils/validateRequest";

export const authRouter = express.Router();

authRouter.post("/signup", validateRequest(createUserZodSchema), createUser);
