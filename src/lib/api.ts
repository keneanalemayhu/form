/* eslint-disable @typescript-eslint/no-explicit-any */
// @/lib/api.ts

import { z } from "zod";

// SCHEMAS at runtime (aliased with *Schema)
import {
  Id as IdSchema,
  Church as ChurchSchema,
  Specialty as SpecialtySchema,
  ParticipantFull as ParticipantFullSchema,
  ParticipantSkillItem as ParticipantSkillItemSchema,
  Training as TrainingSchema,
  LookupResponse as LookupResponseSchema,
  OkAddedSkills as OkAddedSkillsSchema,
  OkDeleted as OkDeletedSchema,
  OkSaved as OkSavedSchema,
  OkUpdated as OkUpdatedSchema,
} from "@/lib/zod";

// TYPES at compile-time (no runtime names)
import type {
  Church,
  Specialty,
  ParticipantFull,
  ParticipantSkillItem,
  Training,
  LookupResponse,
  PaginationQuery,
  CreateChurchInput,
  UpsertSpecialtyInput,
  UpdateSpecialtyInput,
  CreateParticipantInput,
  UpdateParticipantInput,
  SkillSingleInput,
  SkillBulkInput,
  OkAddedSkills,
  OkDeleted,
  OkSaved,
  OkUpdated,
} from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

async function raw(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg =
      (json && typeof json === "object" && "error" in json && (json as any).error) ||
      `${res.status} ${res.statusText}`;
    throw new Error(String(msg));
  }
  return json;
}

async function req<T>(path: string, schema: z.ZodType<T>, init?: RequestInit): Promise<T> {
  const data = await raw(path, init);
  return schema.parse(data);
}

function qs(params?: Record<string, string | number | boolean | null | undefined>) {
  if (!params) return "";
  const obj = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ) as Record<string, string>;
  const s = new URLSearchParams(obj).toString();
  return s ? `?${s}` : "";
}

export const api = {
  // ---------- lookup ----------
  getLookup: () => req<LookupResponse>("/api/lookup", LookupResponseSchema),

  // ---------- churches ----------
  listChurches: () => req<Church[]>("/api/churches", z.array(ChurchSchema)),
  createChurch: (church_name: CreateChurchInput["church_name"]) =>
    req<{ church_id: z.infer<typeof IdSchema> }>(
      "/api/churches",
      z.object({ church_id: IdSchema }),
      { method: "POST", body: JSON.stringify({ church_name }) }
    ),

  // ---------- specialties (POST is upsert + returns row) ----------
  listSpecialties: () => req<Specialty[]>("/api/specialties", z.array(SpecialtySchema)),
  createSpecialty: (data: UpsertSpecialtyInput) =>
    req<Specialty>("/api/specialties", SpecialtySchema, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateSpecialty: (id: number, data: UpdateSpecialtyInput) =>
    req<OkUpdated>(`/api/specialties/${id}`, OkUpdatedSchema, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteSpecialty: (id: number) =>
    req<OkDeleted>(`/api/specialties/${id}`, OkDeletedSchema, { method: "DELETE" }),

  // ---------- participants ----------
  listParticipants: (params?: PaginationQuery) =>
    req<ParticipantFull[]>(`/api/participants${qs(params as any)}`, z.array(ParticipantFullSchema)),
  getParticipant: (id: number) =>
    req<ParticipantFull>(`/api/participants/${id}`, ParticipantFullSchema),
  createParticipant: (data: CreateParticipantInput) =>
    req<ParticipantFull>("/api/participants", ParticipantFullSchema, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateParticipant: (id: number, data: UpdateParticipantInput) =>
    req<OkUpdated>(`/api/participants/${id}`, OkUpdatedSchema, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteParticipant: (id: number) =>
    req<OkDeleted>(`/api/participants/${id}`, OkDeletedSchema, { method: "DELETE" }),

  // ---------- skills ----------
  listParticipantSkills: (id: number) =>
    req<ParticipantSkillItem[]>(
      `/api/participants/${id}/skills`,
      z.array(ParticipantSkillItemSchema)
    ),

  addParticipantSkill: (id: number, payload: SkillSingleInput) =>
    req<OkAddedSkills>(`/api/participants/${id}/skills`, OkAddedSkillsSchema, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  addParticipantSkillsBulk: (id: number, payload: SkillBulkInput) =>
    req<OkAddedSkills>(`/api/participants/${id}/skills`, OkAddedSkillsSchema, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  removeParticipantSkill: (id: number, specialty_id: number) =>
    req<OkDeleted>(`/api/participants/${id}/skills?specialty_id=${specialty_id}`, OkDeletedSchema, {
      method: "DELETE",
    }),

  // ---------- training ----------
  getTraining: async (id: number): Promise<Training | null> => {
    const data = await raw(`/api/participants/${id}/training`);
    if (!data || (typeof data === "object" && Object.keys(data).length === 0)) return null;
    return TrainingSchema.parse(data);
  },
  upsertTraining: (
    id: number,
    data: { current_skill_level?: string; expectations_from_training?: string }
  ) =>
    req<OkSaved>(`/api/participants/${id}/training`, OkSavedSchema, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
