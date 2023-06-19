import { isValidObjectId } from "mongoose";
import { TUser } from "./user.interface";
import User from "./user.model";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

export const createUserService = async (user: TUser) => {
  const createdUser = await User.create(user);
  return createdUser;
};

export const getAllUsersService = async () => {
  const users = await User.find();
  return users;
};

export const getSingleUserService = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user id");
  }

  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return user;
};

export const updateUserService = async (
  id: string,
  payload: Partial<TUser>
) => {
  if (!isValidObjectId(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user id");
  }

  if (payload.name) {
    const existingUser = await User.findOne({ _id: id });

    const name = {
      ...existingUser?.name,
      ...payload?.name,
    };

    payload.name = name;
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updatedUser;
};

export const deleteUserService = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user id");
  }

  const result = await User.deleteOne({ _id: id });

  if (!result.deletedCount) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return result;
};
