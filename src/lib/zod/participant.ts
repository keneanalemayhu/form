// @/lib/zod/participant.ts

import { z } from "zod";

export const participantSchema = z.object({
  participant_id: z.number().optional(),
  name: z.string().min(1),
  fathers_name: z.string().nullable().optional(),
  age: z.number().int().positive().nullable().optional(),
  gender: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  email: z.email().nullable().optional(),
  church_id: z.number().nullable().optional(),
  created_at: z.string().optional(),
});
