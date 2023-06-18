import { RequestHandler, ErrorRequestHandler } from "express";
import { ApiError } from "../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { GenericErrorMessage } from "../types/GenericErrorMessage";

export const notFoundHandler: RequestHandler = (req, res, next) => {
  const error = new ApiError(StatusCodes.NOT_FOUND, "404 Resource not found!");
  next(error);
};

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  const errors: GenericErrorMessage[] = [];
  const statusCode = error?.statusCode ? error.statusCode : 500;

  const errorResponse = {
    success: false,
    message: "Something went wrong!",
    errors: errors,
    stack: process.env.NODE_ENV !== "production" ? error?.stack : null,
  };

  res.status(statusCode).json(errorResponse);
};
