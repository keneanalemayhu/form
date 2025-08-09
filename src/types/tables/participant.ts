// @/types/tables/participant.ts

export interface Participant {
  participant_id: number;
  name: string;
  fathers_name?: string | null;
  age?: number | null;
  gender?: string | null;
  phone_number?: string | null;
  email?: string | null;
  church_id?: number | null;
  created_at?: string;
  updated_at?: string;
}