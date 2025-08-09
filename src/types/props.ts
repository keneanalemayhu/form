/* eslint-disable @typescript-eslint/no-empty-object-type */
// @/types/props.ts

import {
  Church,
  MediaSpecialty,
  Participant,
  ParticipantSkill,
  ParticipantTrainingDetail,
  FormBaseProps,
} from "./index";

export type ChurchProps = FormBaseProps<Church, {}, "church_id">;
export type MediaSpecialtyProps = FormBaseProps<MediaSpecialty, {}, "specialty_id">;
export type ParticipantSkillProps = FormBaseProps<ParticipantSkill, { participants: Participant[]; specialties: MediaSpecialty[] }, "participant_id" | "specialty_id">;
export type ParticipantProps = FormBaseProps<
  Participant,
  { churches: Church[]; specialties: MediaSpecialty[] },
  "participant_id"
>;

export type ParticipantTrainingDetailProps = FormBaseProps<
  ParticipantTrainingDetail,
  { participants: Participant[] },
  "detail_id"
>;
