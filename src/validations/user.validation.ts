import { z } from "zod";
import { userRoleEnum } from "../app/types";

const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, { message: "Password must be at least 6 characters long" }),

    role: z.enum(userRoleEnum, {
      required_error: "Role is required",
      invalid_type_error: "Role must be one of the valid options",
      description: "Valid roles are user, admin, and superadmin",
      errorMap: () => {
        return {
          message: `Invalid role. Valid options are: ${userRoleEnum.join(",")}`,
        };
      },
    }),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .optional(),
    email: z
      .string({
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format")
      .optional(),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .length(6, { message: "Password must be exactly 6 characters long" })
      .optional(),
    role: z
      .enum(userRoleEnum, {
        invalid_type_error: "Role must be one of the valid options",
        description: "Valid roles are user, admin, and superadmin",
        errorMap: () => {
          return {
            message: `Invalid role. Valid options are: ${userRoleEnum.join(",")}`,
          };
        },
      })
      .optional(),
  }),
});

const passwordChangeSchema = z.object({
  body: z
    .object({
      password: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string",
        })
        .min(6, { message: "Password must be at least 6 characters long" }),
      confirmPassword: z
        .string({
          required_error: "Confirm password is required",
          invalid_type_error: "Confirm password must be a string",
        })
        .min(6, {
          message: "Confirm password must be at least 6 characters long",
        }),
    })
    .refine((data) => data.password !== data.confirmPassword, {
      message: "Password and confirm password must be the same",
    }),
});

export { createUserSchema, passwordChangeSchema, updateUserSchema };
