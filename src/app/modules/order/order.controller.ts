import expressAsyncHandler from "express-async-handler";
import { sendResponse } from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { TOrder } from "./order.interface";
import { createOrderService } from "./order.services";

export const createOrder = expressAsyncHandler(async (req, res) => {
  const { cow, buyer } = req.body as Record<string, string>;

  const order = await createOrderService(cow, buyer);

  sendResponse<TOrder>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Order created successfully",
    data: order,
  });
});
