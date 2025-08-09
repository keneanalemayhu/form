// @/components/common/tables/columns/participantSkills.tsx

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ParticipantSkill } from "@/types/tables/participantSkill";
import { DeleteDialog } from "@/components/common/dialogs/DeleteDialog";

export function useParticipantSkillColumns(
  participants: { participant_id: number; name: string }[],
  specialties: { specialty_id: number; specialty_name: string }[],
  onDelete: (skill: ParticipantSkill) => void
): ColumnDef<ParticipantSkill>[] {
  return [
    {
      accessorKey: "participant_id",
      header: "Participant",
      cell: ({ row }) => {
        const participantId = row.original.participant_id;
        const participant = participants.find((p) => p.participant_id === participantId);
        return <>{participant?.name ?? "N/A"}</>;
      },
    },
    {
      accessorKey: "specialty_id",
      header: "Specialty",
      cell: ({ row }) => {
        const specialtyId = row.original.specialty_id;
        const specialty = specialties.find((s) => s.specialty_id === specialtyId);
        return <>{specialty?.specialty_name ?? "N/A"}</>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const skill = row.original;
        return (
          <div className="flex gap-2">
            <DeleteDialog
              title="Delete Participant Skill"
              message={`Delete skill?`}
              onConfirm={() => onDelete(skill)}
            />
          </div>
        );
      },
    },
  ];
}
