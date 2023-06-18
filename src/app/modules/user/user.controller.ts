import expressAsyncHandler from "express-async-handler";
import { sendResponse } from "../../../utils/sendResponse";
import { TUser } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import { createUserService, getAllUsersService } from "./user.services";

export const createUser = expressAsyncHandler(async (req, res) => {
  const user = await createUserService(req.body);

  sendResponse<TUser>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User created successfully",
    data: user,
  });
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await getAllUsersService();

  sendResponse<TUser>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users retrieved successfully",
    data: users,
  });
});
