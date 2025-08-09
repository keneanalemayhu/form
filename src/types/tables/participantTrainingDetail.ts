// @/types/tables/participantTrainingDetail.ts

export interface ParticipantTrainingDetail {
  detail_id: number;
  participant_id: number;
  current_skill_level?: string | null;
  expectations_from_training?: string | null;
  created_at?: string;
  updated_at?: string;
}