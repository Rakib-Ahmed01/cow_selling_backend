import z from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    name: z
      .object(
        {
          firstName: z.string().min(1).max(255),
          lastName: z.string().min(1).max(255),
        },
        {
          required_error: "Name is required",
          invalid_type_error:
            "Name must be an object with firstName and lastName properties",
        }
      )
      .refine((value) => !!value.firstName && !!value.lastName, {
        message: "First name and Last name are required",
      }),
    phoneNumber: z
      .string({
        required_error: "Phone Number is required",
        invalid_type_error: "Phone Number must be string",
      })
      .min(11)
      .max(255),
    role: z.enum(["buyer", "seller"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be buyer or seller",
    }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      })
      .min(6)
      .max(255),
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be an object",
      })
      .min(2)
      .max(255),
    budget: z
      .number({
        invalid_type_error: "Budget must be number",
      })
      .optional()
      .default(0),
    income: z
      .number({
        invalid_type_error: "Income must be number",
      })
      .optional()
      .default(0),
  }),
});

export const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object(
        {
          firstName: z.string().min(1).max(255).optional(),
          lastName: z.string().min(1).max(255).optional(),
        },
        {
          invalid_type_error:
            "Name must be an object with firstName and lastName properties",
        }
      )
      .optional(),
    phoneNumber: z
      .string({
        required_error: "Phone Number is required",
        invalid_type_error: "Phone Number must be string",
      })
      .min(11)
      .max(255)
      .optional(),
    role: z
      .enum(["buyer", "seller"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be buyer or seller",
      })
      .optional(),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
      })
      .min(6)
      .max(255)
      .optional(),
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be an object",
      })
      .min(2)
      .max(255)
      .optional(),
    budget: z
      .number({
        invalid_type_error: "Budget must be number",
      })
      .optional()
      .default(0),
    income: z
      .number({
        invalid_type_error: "Income must be number",
      })
      .optional()
      .default(0),
  }),
});
