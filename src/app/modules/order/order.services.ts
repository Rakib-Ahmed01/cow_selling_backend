import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import Cow from "../cow/cow.model";
import User from "../user/user.model";
import { Order } from "./order.model";
import { startSession } from "mongoose";

export const createOrderService = async (cow: string, buyer: string) => {
  const session = await startSession();
  let order;

  try {
    session.startTransaction();

    const selectedCow = await Cow.findOne({ _id: cow }).session(session);
    const selectedBuyer = await User.findOne({ _id: buyer }).session(session);

    if (!selectedBuyer || !selectedCow) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Buyer or Cow not found");
    }

    if (selectedCow.label === "sold out") {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Cow is sold out");
    }

    if (selectedBuyer.role === "seller") {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "You cannot buy a cow with a seller account."
      );
    }

    if (selectedBuyer.budget < selectedCow.price) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Insufficient funds to buy the cow"
      );
    }

    await Promise.all([
      Cow.updateOne({ _id: cow }, { $set: { label: "sold out" } }).session(
        session
      ),
      User.updateOne(
        { _id: buyer },
        { $inc: { budget: -selectedCow.price } }
      ).session(session),
      User.updateOne(
        { _id: selectedCow.seller },
        { $inc: { budget: selectedCow.price } }
      ).session(session),
    ]);

    order = await Order.create([{ cow, buyer }], { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  return order;
};
