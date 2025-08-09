// @/lib/zod/mediaSpecialty.ts

import { z } from "zod";

export const mediaSpecialtySchema = z.object({
  specialty_id: z.number().optional(),
  specialty_name: z.string().min(1),
  description: z.string().nullable().optional(),
});
