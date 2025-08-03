import { z } from "zod";
import { bloodGroupEnum } from "../app/types";

const createDonarSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be at least 2 characters long " }),

    bloodGroup: z.enum(bloodGroupEnum, {
      required_error: "Blood group is required",
      invalid_type_error: "Blood group must be one of the valid options",
      description: "Valid blood groups are A+, A-, B+, B-, O+, O-, AB+, AB-",
      errorMap: () => {
        return {
          message: `Invalid blood group. Valid options are: ${bloodGroupEnum.join(", ")}`,
        };
      },
    }),
    contactNo: z
      .string({
        required_error: "Contact number is required",
        invalid_type_error: "Contact number must be a string",
      })
      .length(11, {
        message: "Contact number must be exactly 11 characters long",
      }),
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
      })
      .min(2, { message: "Address must be at least 2 characters long" }),
  }),
});

const updateDonarSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .optional(),
    bloodGroup: z
      .enum(bloodGroupEnum, {
        invalid_type_error: "Blood group must be one of the valid options",
        description: "Valid blood groups are A+, A-, B+, B-, O+, O-, AB+, AB-",
        errorMap: () => {
          return {
            message: `Invalid blood group. Valid options are: ${bloodGroupEnum.join(", ")}`,
          };
        },
      })
      .optional(),
    contactNo: z
      .string()
      .length(11, {
        message: "Contact number must be exactly 11 characters long",
      })
      .optional(),
    address: z.string().optional(),
  }),
});

const bulkDeleteDonarSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});

export { bulkDeleteDonarSchema, createDonarSchema, updateDonarSchema };
