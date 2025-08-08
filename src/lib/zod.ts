// @/lib/zod.ts
import { z } from "zod";

/*  shared  */
export const Id = z.number().int().positive();
export type Id = z.infer<typeof Id>;

export const PaginationQuery = z.object({
  q: z.string().trim().optional(),
  church_id: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});
export type PaginationQuery = z.infer<typeof PaginationQuery>;

/*  churches  */
export const Church = z.object({
  church_id: Id,
  church_name: z.string().trim().min(1),
});
export type Church = z.infer<typeof Church>;

export const CreateChurchInput = z.object({
  church_name: Church.shape.church_name,
});
export type CreateChurchInput = z.infer<typeof CreateChurchInput>;

/*  specialties  */
export const Specialty = z.object({
  specialty_id: Id,
  specialty_name: z.string().trim().min(1),
  description: z.string().trim().nullish(),
});
export type Specialty = z.infer<typeof Specialty>;

export const UpsertSpecialtyInput = z.object({
  specialty_name: Specialty.shape.specialty_name,
  description: z.string().trim().optional(),
});
export type UpsertSpecialtyInput = z.infer<typeof UpsertSpecialtyInput>;

export const UpdateSpecialtyInput = z.object({
  specialty_name: z.string().trim().min(1).optional(),
  description: z.string().trim().optional(),
});
export type UpdateSpecialtyInput = z.infer<typeof UpdateSpecialtyInput>;

/*  training  */
export const Training = z.object({
  detail_id: Id,
  current_skill_level: z.string().trim().default("Beginner"),
  expectations_from_training: z.string().trim().nullish(),
});
export type Training = z.infer<typeof Training>;

export const UpsertTrainingInput = z.object({
  current_skill_level: z.string().trim().optional(),
  expectations_from_training: z.string().trim().optional(),
});
export type UpsertTrainingInput = z.infer<typeof UpsertTrainingInput>;

/*  participants  */
export const ParticipantBase = z.object({
  participant_id: Id,
  name: z.string().trim().min(1),
  fathers_name: z.string().trim().nullish(),
  age: z.number().int().nullish(),
  gender: z.string().trim().nullish(),
  phone_number: z.string().trim().nullish(),
  email: z.string().email().nullish(),
  church_id: Id.nullish(),
  created_at: z.string(), // "YYYY-MM-DD HH:mm:ss"
});
export type ParticipantBase = z.infer<typeof ParticipantBase>;

export const ParticipantSkillItem = z.object({
  specialty_id: Id,
  specialty_name: z.string().trim(),
});
export type ParticipantSkillItem = z.infer<typeof ParticipantSkillItem>;

export const ParticipantFull = ParticipantBase.extend({
  church_name: z.string().trim().optional(), // present on list/create fetch
  skills: z.array(ParticipantSkillItem).optional(),
  training: Training.nullish(),
});
export type ParticipantFull = z.infer<typeof ParticipantFull>;

export const CreateParticipantInput = z.object({
  name: z.string().trim().min(1),
  fathers_name: z.string().trim().optional(),
  age: z.number().int().optional(),
  gender: z.string().trim().optional(),
  phone_number: z.string().trim().optional(),
  email: z.string().email().optional(),
  church_id: z.number().int().positive().optional(),
});
export type CreateParticipantInput = z.infer<typeof CreateParticipantInput>;

export const UpdateParticipantInput = CreateParticipantInput.partial();
export type UpdateParticipantInput = z.infer<typeof UpdateParticipantInput>;

/*  skills add/remove  */
// server accepts either specialty_id OR specialty_name
export const SkillById = z.object({ specialty_id: Id });
export const SkillByName = z.object({
  specialty_name: z.string().trim().min(1),
});
export const SkillSingleInput = z.union([SkillById, SkillByName]);

export const SkillBulkInput = z.object({
  skills: z.array(z.union([SkillById, SkillByName])).min(1),
});

export type SkillSingleInput = z.infer<typeof SkillSingleInput>;
export type SkillBulkInput = z.infer<typeof SkillBulkInput>;

/*  lookup  */
export const LookupResponse = z.object({
  churches: z.array(Church.pick({ church_id: true, church_name: true })),
  specialties: z.array(Specialty.pick({ specialty_id: true, specialty_name: true })),
});
export type LookupResponse = z.infer<typeof LookupResponse>;

/*  API response shapes (common)  */
export const OkAddedSkills = z.object({
  added: z.literal(true),
  skills: z.array(ParticipantSkillItem),
});
export type OkAddedSkills = z.infer<typeof OkAddedSkills>;

export const OkDeleted = z.object({ deleted: z.boolean() });
export type OkDeleted = z.infer<typeof OkDeleted>;

export const OkSaved = z.object({ saved: z.boolean() });
export type OkSaved = z.infer<typeof OkSaved>;

export const OkUpdated = z.object({ updated: z.boolean() });
export type OkUpdated = z.infer<typeof OkUpdated>;

export const ApiError = z.object({ error: z.string() });
export type ApiError = z.infer<typeof ApiError>;
