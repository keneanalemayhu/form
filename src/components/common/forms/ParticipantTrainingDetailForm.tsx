// @/components/common/forms/ParticipantTrainingDetailForm.tsx

"use client";
import { useState } from "react";
import { ParticipantTrainingDetail } from "@/types/tables/participantTrainingDetail";
import { FormBaseProps } from "@/types/base";

type Props = FormBaseProps<ParticipantTrainingDetail, {
    participants: { participant_id: number; name: string }[];
}>;

export function ParticipantTrainingDetailForm({ onAdd, closeDialog, existing, participants }: Props) {
    const [participant_id, setParticipantId] = useState(existing?.participant_id ?? 0);
    const [current_skill_level, setSkillLevel] = useState(existing?.current_skill_level ?? "Beginner");
    const [expectations_from_training, setExpectations] = useState(existing?.expectations_from_training ?? "");

    const handleSubmit = () => {
        if (!participant_id) return;

        const newDetail = {
            participant_id,
            current_skill_level,
            expectations_from_training: expectations_from_training || null,
            ...(existing?.detail_id !== undefined && { detail_id: existing.detail_id }),
        };

        onAdd?.(newDetail as Omit<ParticipantTrainingDetail, "created_at" | "updated_at">);
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
                <label className="w-36 text-sm font-medium text-right">Current Skill Level</label>
                <input
                    type="text"
                    className="w-full rounded border border-input px-3 py-2 text-sm"
                    value={current_skill_level}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    placeholder="e.g. Beginner, Intermediate"
                />
            </div>

            <div className="flex items-center gap-4">
                <label className="w-36 text-sm font-medium text-right">Expectations</label>
                <textarea
                    className="w-full rounded border border-input px-3 py-2 text-sm"
                    rows={3}
                    value={expectations_from_training}
                    onChange={(e) => setExpectations(e.target.value)}
                    placeholder="What do you expect from training?"
                />
            </div>

            <div className="flex justify-end gap-4 pt-1 pb-1">
                <button type="button" onClick={closeDialog} className="btn btn-outline">
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    {existing ? "Update" : "Add"}
                </button>
            </div>
        </form>
    );
}
