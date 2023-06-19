import expressAsyncHandler from "express-async-handler";
import { sendResponse } from "../../../utils/sendResponse";
import { TUser } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
} from "./user.services";

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
  const user = await getSingleUserService(id);

  sendResponse<TUser>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User retrieved successfully",
    data: user,
  });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedUser = await updateUserService(id, payload);

  sendResponse<TUser>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: updatedUser,
  });
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteUserService(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User deleted successfully",
    data: result,
  });
});
