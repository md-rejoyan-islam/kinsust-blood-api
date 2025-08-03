import { z } from "zod";

const createHistorySchema = z.object({
  body: z.object({
    donarId: z.string(),
    patientId: z.string(),
  }),
});

const updateHistorySchema = z.object({
  body: z.object({
    donarId: z.string().optional(),
    patientId: z.string().optional(),
  }),
});

export { createHistorySchema, updateHistorySchema };
