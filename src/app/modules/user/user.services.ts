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
