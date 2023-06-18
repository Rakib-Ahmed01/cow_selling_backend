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
        }
      )
      .refine((value) => !!value.firstName && !!value.lastName, {
        message: "First name and Last name are required",
      }),
    phoneNumber: z
      .string({
        required_error: "Phone Number is required",
      })
      .min(11)
      .max(255),
    role: z.enum(["buyer", "seller"], {
      required_error: "Role is required",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6)
      .max(255),
    address: z
      .string({
        required_error: "Address is required",
      })
      .min(2)
      .max(255),
    budget: z.number().optional().default(0),
    income: z.number().optional().default(0),
  }),
});
