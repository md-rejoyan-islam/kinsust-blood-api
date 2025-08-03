import type { Request } from "express";

export interface RequestWithUser extends Request {
  me?: any;
}

export const bloodGroupEnum = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
] as const;

export const userRoleEnum = ["admin", "superAdmin", "moderator"] as const;
