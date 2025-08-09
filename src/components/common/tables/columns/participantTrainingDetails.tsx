// @/components/common/tables/columns/participantTrainingDetails.tsx

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ParticipantTrainingDetail } from "@/types/tables/participantTrainingDetail";
import { EditDialog } from "@/components/common/dialogs/EditDialog";
import { DeleteDialog } from "@/components/common/dialogs/DeleteDialog";
import { ParticipantTrainingDetailForm } from "@/components/common/forms/ParticipantTrainingDetailForm";

export function useParticipantTrainingDetailColumns(
  participants: { participant_id: number; name: string }[],
  onDelete: (id: number) => void,
  onUpdate: (detail: ParticipantTrainingDetail) => void
): ColumnDef<ParticipantTrainingDetail>[] {
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
      accessorKey: "current_skill_level",
      header: "Current Skill Level",
    },
    {
      accessorKey: "expectations_from_training",
      header: "Expectations",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const detail = row.original;
        return (
          <div className="flex gap-2">
            <EditDialog title="Edit Training Detail">
              {(close) => (
                <ParticipantTrainingDetailForm
                  existing={detail}
                  participants={participants}
                  onAdd={(upd) => {
                    onUpdate({ ...detail, ...upd });
                    close();
                  }}
                  closeDialog={close}
                />
              )}
            </EditDialog>
            <DeleteDialog
              title="Delete Training Detail"
              message={`Delete training detail?`}
              onConfirm={() => onDelete(detail.detail_id)}
            />
          </div>
        );
      },
    },
  ];
}
