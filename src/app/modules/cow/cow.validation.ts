import { z } from "zod";
import { breeds, categories, labels, locations } from "./cow.contants";
import { isValidObjectId } from "mongoose";

export const createCowZodSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }),
      age: z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be a number",
      }),
      price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      }),
      location: z.enum(locations, {
        required_error: "Location is required",
        invalid_type_error: `Location must be - ${locations.join(" or ")}`,
      }),
      label: z
        .enum(labels, {
          invalid_type_error: `Label must be - ${labels.join(" or ")}`,
        })
        .optional(),
      breed: z.enum(breeds, {
        required_error: "Breed is required",
        invalid_type_error: `Breed must be - ${breeds.join(" or ")}`,
      }),
      category: z.enum(categories, {
        required_error: "Category is required",
        invalid_type_error: `Category must be - ${categories.join(" or ")}`,
      }),
      weight: z.number({
        required_error: "Weight is required",
        invalid_type_error: "Weight must be a number",
      }),
      seller: z
        .string({
          required_error: "Seller is required",
          invalid_type_error: "Seller must be a string",
        })
        .refine((val) => isValidObjectId(val), {
          message: "Invalid Seller id",
        }),
    })
    .strict(),
});

export const updateCowZodSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: "Name must be a string",
        })
        .optional(),
      age: z
        .number({
          invalid_type_error: "Age must be a number",
        })
        .optional(),
      price: z
        .number({
          invalid_type_error: "Price must be a number",
        })
        .optional(),
      location: z
        .enum(locations, {
          invalid_type_error: `Location must be - ${locations.join(" or ")}`,
        })
        .optional(),
      label: z
        .enum(labels, {
          invalid_type_error: `Label must be - ${labels.join(" or ")}`,
        })
        .optional(),
      breed: z
        .enum(breeds, {
          invalid_type_error: `Breed must be - ${breeds.join(" or ")}`,
        })
        .optional(),
      category: z
        .enum(categories, {
          invalid_type_error: `Category must be - ${categories.join(" or ")}`,
        })
        .optional(),
      weight: z
        .number({
          invalid_type_error: "Weight must be a number",
        })
        .optional(),
      seller: z
        .string({
          invalid_type_error: "Seller must be a string",
        })
        .refine((val) => isValidObjectId(val), {
          message: "Invalid Seller id",
        })
        .optional(),
    })
    .strict()
    .refine(
      (val) => {
        return Object.keys(val).length !== 0;
      },
      {
        message: "Missing update data",
      }
    ),
});
