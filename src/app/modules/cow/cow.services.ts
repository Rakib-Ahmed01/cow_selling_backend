import { isValidObjectId } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { TCow } from "./cow.interface";
import Cow from "./cow.model";

export const createCowService = async (cow: TCow) => {
  const createdCow = await Cow.create(cow);
  return createdCow;
};

export const getAllCowsService = async () => {
  const cows = await Cow.find();
  return cows;
};

export const getSingleCowService = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid cow id");
  }

  const cow = await Cow.findOne({ _id: id });

  if (!cow) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Cow not found");
  }

  return cow;
};

export const updateCowService = async (id: string, payload: Partial<TCow>) => {
  if (!isValidObjectId(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid cow id");
  }

  const updatedCow = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updatedCow;
};

// export const deleteCowService = async (id: string) => {
//   if (!isValidObjectId(id)) {
//     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid cow id");
//   }

//   const result = await Cow.deleteOne({ _id: id });

//   if (!result.deletedCount) {
//     throw new ApiError(StatusCodes.NOT_FOUND, "Cow not found");
//   }

//   return result;
// };
