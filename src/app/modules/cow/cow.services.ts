import { isValidObjectId } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { TCow } from "./cow.interface";
import Cow from "./cow.model";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { FilterOptions } from "../../../types/FilterOptions";
import { calculateSkip } from "../../../utils/calculateSkip";
import { generateSearchCondition } from "../../../utils/generateSearchCondition";
import { PaginationResponse } from "../../../types/PaginationResponse";
import { handleFilters } from "../../../utils/handleFilters";
import User from "../user/user.model";

export const createCowService = async (cow: TCow) => {
  const seller = await User.findOne({ _id: cow.seller });

  if (!seller) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Seller not found");
  }

  if (seller.role === "buyer") {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "You can not sell cow wih this account. This is a buyer account."
    );
  }

  const createdCow = await Cow.create(cow);
  return createdCow;
};

export const getAllCowsService = async (
  paginationOptions: PaginationOptions,
  filterOptions: FilterOptions
): Promise<PaginationResponse<TCow[]>> => {
  const { limit, page, skip } = calculateSkip(paginationOptions);
  const { sortBy, sortOrder } = paginationOptions;
  const { searchTerm, ...filters } = filterOptions;
  const filterObj = handleFilters(filters as FilterOptions);

  const searchCondition = generateSearchCondition("or", searchTerm, [
    "location",
    "breed",
    "category",
  ]);

  const [cows, total] = await Promise.all([
    Cow.find({ $and: [searchCondition, filterObj] })
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      })
      .populate("seller")
      .lean(),
    Cow.countDocuments(),
  ]);

  return {
    data: cows,
    meta: {
      limit,
      page,
      total,
    },
  };
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

export const deleteCowService = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid cow id");
  }

  const result = await Cow.deleteOne({ _id: id });

  if (!result.deletedCount) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Cow not found");
  }

  return result;
};
