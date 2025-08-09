// @/components/common/forms/ParticipantSkillForm.tsx

"use client";
import { useState } from "react";
import { ParticipantSkill } from "@/types/tables/participantSkill";
import { FormBaseProps } from "@/types/base";

type Props = FormBaseProps<ParticipantSkill, {
  participants: { participant_id: number; name: string }[];
  specialties: { specialty_id: number; specialty_name: string }[];
}>;

export function ParticipantSkillForm({ onAdd, closeDialog, existing, participants, specialties }: Props) {
  const [participant_id, setParticipantId] = useState(existing?.participant_id ?? 0);
  const [specialty_id, setSpecialtyId] = useState(existing?.specialty_id ?? 0);

  const handleSubmit = () => {
    if (!participant_id || !specialty_id) return;

    onAdd?.({ participant_id, specialty_id });
    closeDialog?.();
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      className="grid gap-3 py-2 px-1 text-sm max-w-md"
    >
      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Participant</label>
        <select
          className="w-full rounded border border-input px-3 py-2 text-sm"
          value={participant_id}
          onChange={(e) => setParticipantId(Number(e.target.value))}
        >
          <option value={0}>Select participant</option>
          {participants.map((p) => (
            <option key={p.participant_id} value={p.participant_id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Specialty</label>
        <select
          className="w-full rounded border border-input px-3 py-2 text-sm"
          value={specialty_id}
          onChange={(e) => setSpecialtyId(Number(e.target.value))}
        >
          <option value={0}>Select specialty</option>
          {specialties.map((s) => (
            <option key={s.specialty_id} value={s.specialty_id}>
              {s.specialty_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-4 pt-1 pb-1">
        <button type="button" onClick={closeDialog} className="btn btn-outline">Cancel</button>
        <button type="submit" className="btn btn-primary">Add</button>
      </div>
    </form>
  );
}
