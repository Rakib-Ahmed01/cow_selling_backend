import { TUser } from "./user.interface";
import User from "./user.model";

export const createUserService = async (user: TUser) => {
  const createdUser = await User.create(user);
  return createdUser;
};

export const getAllUsersService = async () => {
  const users = await User.find();
  return users;
};

export const getSingleUserService = async (id: string) => {
  const user = await User.findOne({ _id: id });
  return user;
};

export const deleteUserService = async (id: string) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};
