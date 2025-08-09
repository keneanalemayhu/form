// @/types/base.ts

export interface BaseEntity {
  created_at: string;
  updated_at: string;
}

export interface FullEntity extends BaseEntity {
  updated_at: string;
}

export interface ChurchBase {
  church_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface MediaSpecialtyBase {
  specialty_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface ParticipantBase {
  participant_id: number;
  created_at: string;
  updated_at?: string;
}

export interface ParticipantTrainingDetailBase {
  detail_id: number;
  created_at?: string;
  updated_at?: string;
}

export type FormBaseProps<T, Extras = unknown, Key extends keyof T = keyof T> = Extras & {
  onAdd?: (input: Omit<T, Key | "created_at" | "updated_at">) => void;
  closeDialog?: () => void;
  existing?: T;
};
