// @/lib/zod/participantTrainingDetail.ts

import { z } from "zod";

export const participantTrainingDetailSchema = z.object({
  participant_id: z.number(),
  current_skill_level: z.string().optional().nullable(),
  expectations_from_training: z.string().optional().nullable(),
});
