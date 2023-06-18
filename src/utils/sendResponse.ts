import { ApiResponse } from "../types/ApiResponse";
import { Response } from "express";

export const sendResponse = <T>(res: Response, response: ApiResponse<T>) => {
  res.status(response.statusCode).json(response);
};
