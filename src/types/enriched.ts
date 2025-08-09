// @/types/enriched.ts

import { Participant, ParticipantTrainingDetail } from ".";

export type EnrichedParticipant = Participant & {
  church_name?: string;
};

export type EnrichedParticipantSkill = {
  participant_id: number;
  specialty_id: number;
  participant_name?: string;
  specialty_name?: string;
};

export type EnrichedParticipantTrainingDetail = ParticipantTrainingDetail & {
  participant_name?: string;
};
