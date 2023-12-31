import expressAsyncHandler from "express-async-handler";
import { sendResponse } from "../../../utils/sendResponse";
import { TCow } from "./cow.interface";
import { StatusCodes } from "http-status-codes";
import {
  createCowService,
  deleteCowService,
  getAllCowsService,
  getSingleCowService,
  updateCowService,
} from "./cow.services";
import { QueryObject } from "../../../types/QueryObject";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { pickOptions } from "../../../utils/pickOptions";
import { FilterOptions } from "../../../types/FilterOptions";

export const createCow = expressAsyncHandler(async (req, res) => {
  const cow = await createCowService(req.body);

  sendResponse<TCow>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cow created successfully",
    data: cow,
  });
});

export const getAllCows = expressAsyncHandler(async (req, res) => {
  const paginationOptions = pickOptions(req.query as QueryObject, [
    "page",
    "limit",
    "sortOrder",
    "sortBy",
  ]) as PaginationOptions;

  const filters = pickOptions(req.query as QueryObject, [
    "minPrice",
    "maxPrice",
    "location",
    "searchTerm",
  ]) as FilterOptions;

  const result = await getAllCowsService(paginationOptions, filters);

  sendResponse<TCow>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cows retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const getSingleCow = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const cow = await getSingleCowService(id);

  sendResponse<TCow>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cow retrieved successfully",
    data: cow,
  });
});

export const updateCow = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedCow = await updateCowService(id, payload);

  sendResponse<TCow>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cow updated successfully",
    data: updatedCow,
  });
});

export const deleteCow = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCowService(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cow deleted successfully",
    data: result,
  });
});
