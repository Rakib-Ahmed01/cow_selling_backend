import expressAsyncHandler from "express-async-handler";
import { createUserService } from "./user.services";
import { sendResponse } from "../../../utils/sendResponse";
import { TUser } from "./user.interface";
import { StatusCodes } from "http-status-codes";

export const createUser = expressAsyncHandler(async (req, res) => {
  const user = await createUserService(req.body);

  sendResponse<TUser>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User created successfully",
    data: user,
  });
});
