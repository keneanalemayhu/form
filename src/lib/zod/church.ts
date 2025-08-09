// @/lib/zod/church.ts

import { z } from "zod";

export const churchSchema = z.object({
  church_name: z.string().min(1, "Church name is required"),
});
