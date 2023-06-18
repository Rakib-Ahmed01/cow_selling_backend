import expressAsyncHandler from "express-async-handler";
import { sendResponse } from "../../../utils/sendResponse";
import { TUser } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import {
  createUserService,
  getAllUsersService,
  getSingleUserService,
} from "./user.services";
import { isValidObjectId } from "mongoose";
import ApiError from "../../../errors/ApiError";

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

export const getSingleUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user id");
  }

  const user = await getSingleUserService(id);

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  sendResponse<TUser>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users retrieved successfully",
    data: user,
  });
});
