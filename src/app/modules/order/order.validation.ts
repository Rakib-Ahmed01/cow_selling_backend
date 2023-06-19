import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const createOrderZodSchema = z.object({
  body: z.object({
    cow: z
      .string({
        required_error: "Cow property is required",
        invalid_type_error: "Cow property must be a string",
      })
      .refine((val) => isValidObjectId(val), {
        message: "Invalid cow id",
      }),
    buyer: z
      .string({
        required_error: "Buyer property is required",
        invalid_type_error: "Buyer property must be a string",
      })
      .refine((val) => isValidObjectId(val), {
        message: "Invalid buyer id",
      }),
  }),
});
