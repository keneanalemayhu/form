/* eslint-disable @typescript-eslint/no-explicit-any */
// @/lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}: ${msg}`);
  }
  return res.json();
}

function qs(params?: Record<string, string | number | boolean | null | undefined>) {
  if (!params) return "";
  const obj = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ) as Record<string, string>;
  const s = new URLSearchParams(obj).toString();
  return s ? `?${s}` : "";
}

export type LookupResponse = {
  churches: { church_id: number; church_name: string }[];
  specialties: { specialty_id: number; specialty_name: string }[];
};

export const api = {
  // lookup 
  getLookup: () => req<LookupResponse>("/api/lookup"),

  // churches 
  listChurches: () => req("/api/churches"),
  createChurch: (church_name: string) =>
    req("/api/churches", { method: "POST", body: JSON.stringify({ church_name }) }),

  // specialties (POST is upsert + returns row) 
  listSpecialties: () => req("/api/specialties"),
  createSpecialty: (data: { specialty_name: string; description?: string }) =>
    req("/api/specialties", { method: "POST", body: JSON.stringify(data) }),
  updateSpecialty: (id: number, data: { specialty_name?: string; description?: string }) =>
    req(`/api/specialties/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteSpecialty: (id: number) => req(`/api/specialties/${id}`, { method: "DELETE" }),

  // participants 
  listParticipants: (params?: { q?: string; church_id?: number; page?: number; limit?: number }) =>
    req(`/api/participants${qs(params as any)}`),
  getParticipant: (id: number) => req(`/api/participants/${id}`),
  // returns full participant row w/ church_name
  createParticipant: (data: any) =>
    req("/api/participants", { method: "POST", body: JSON.stringify(data) }),
  updateParticipant: (id: number, data: any) =>
    req(`/api/participants/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteParticipant: (id: number) => req(`/api/participants/${id}`, { method: "DELETE" }),

  // skills 
  listParticipantSkills: (id: number) => req(`/api/participants/${id}/skills`),

  // single by id
  addParticipantSkillById: (id: number, specialty_id: number) =>
    req(`/api/participants/${id}/skills`, {
      method: "POST",
      body: JSON.stringify({ specialty_id }),
    }),

  // single by name
  addParticipantSkillByName: (id: number, specialty_name: string) =>
    req(`/api/participants/${id}/skills`, {
      method: "POST",
      body: JSON.stringify({ specialty_name }),
    }),

  // bulk (mix id + name)
  addParticipantSkillsBulk: (
    id: number,
    skills: Array<{ specialty_id?: number; specialty_name?: string }>
  ) =>
    req(`/api/participants/${id}/skills`, {
      method: "POST",
      body: JSON.stringify({ skills }),
    }),

  removeParticipantSkill: (id: number, specialty_id: number) =>
    req(`/api/participants/${id}/skills?specialty_id=${specialty_id}`, { method: "DELETE" }),

  // training 
  getTraining: (id: number) => req(`/api/participants/${id}/training`),
  upsertTraining: (
    id: number,
    data: { current_skill_level?: string; expectations_from_training?: string }
  ) => req(`/api/participants/${id}/training`, { method: "POST", body: JSON.stringify(data) }),
};
