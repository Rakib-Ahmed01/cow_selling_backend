import mongoose from "mongoose";
import { ValidationErrorResponse } from "../types/ValidationErrorResponse";
import { GenericErrorMessage } from "../types/GenericErrorMessage";

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): ValidationErrorResponse => {
  const errors: GenericErrorMessage[] = Object.values(error.errors).map(
    (err) => {
      return {
        path: err?.path,
        message: err?.message.replace("Path ", ""),
      };
    }
  );

  return {
    status: 400,
    message: "Validation Error",
    errors,
  };
};
