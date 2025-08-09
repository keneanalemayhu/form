// @/lib/zod/participantSkill.ts

import { z } from "zod";

export const participantSkillSchema = z.object({
  participant_id: z.number(),
  specialty_id: z.number(),
});
