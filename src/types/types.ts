// @/types/types.ts

import { z } from "zod";
import {
  // entity schemas (aliased to avoid name collisions)
  Id as IdSchema,
  Church as ChurchSchema,
  Specialty as SpecialtySchema,
  ParticipantFull as ParticipantFullSchema,
  ParticipantSkillItem as ParticipantSkillItemSchema,
  Training as TrainingSchema,
  // utility schemas
  LookupResponse as LookupResponseSchema,
  PaginationQuery as PaginationQuerySchema,
  // response helpers
  OkAddedSkills as OkAddedSkillsSchema,
  OkDeleted as OkDeletedSchema,
  OkSaved as OkSavedSchema,
  OkUpdated as OkUpdatedSchema,
  // input schemas
  CreateChurchInput as CreateChurchInputSchema,
  UpsertSpecialtyInput as UpsertSpecialtyInputSchema,
  UpdateSpecialtyInput as UpdateSpecialtyInputSchema,
  CreateParticipantInput as CreateParticipantInputSchema,
  UpdateParticipantInput as UpdateParticipantInputSchema,
  SkillSingleInput as SkillSingleInputSchema,
  SkillBulkInput as SkillBulkInputSchema,
} from "@/lib/zod";

// primitive / utility
export type Id = z.infer<typeof IdSchema>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

// entities
export type Church = z.infer<typeof ChurchSchema>;
export type Specialty = z.infer<typeof SpecialtySchema>;
export type ParticipantFull = z.infer<typeof ParticipantFullSchema>;
export type ParticipantSkillItem = z.infer<typeof ParticipantSkillItemSchema>;
export type Training = z.infer<typeof TrainingSchema>;
export type LookupResponse = z.infer<typeof LookupResponseSchema>;

// inputs
export type CreateChurchInput = z.infer<typeof CreateChurchInputSchema>;
export type UpsertSpecialtyInput = z.infer<typeof UpsertSpecialtyInputSchema>;
export type UpdateSpecialtyInput = z.infer<typeof UpdateSpecialtyInputSchema>;
export type CreateParticipantInput = z.infer<typeof CreateParticipantInputSchema>;
export type UpdateParticipantInput = z.infer<typeof UpdateParticipantInputSchema>;
export type SkillSingleInput = z.infer<typeof SkillSingleInputSchema>;
export type SkillBulkInput = z.infer<typeof SkillBulkInputSchema>;

// common API response shapes
export type OkAddedSkills = z.infer<typeof OkAddedSkillsSchema>;
export type OkDeleted = z.infer<typeof OkDeletedSchema>;
export type OkSaved = z.infer<typeof OkSavedSchema>;
export type OkUpdated = z.infer<typeof OkUpdatedSchema>;
