// @/components/common/tables/columns/media/participants.tsx

"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Participant } from "@/types/tables/participant";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/common/dialogs/EditDialog";
import { DeleteDialog } from "@/components/common/dialogs/DeleteDialog";
import { ParticipantForm } from "@/components/common/forms/ParticipantForm";

export function useParticipantColumns(
  churches: { church_id: number; church_name: string }[],
  onDelete: (id: number) => void,
  onUpdate: (item: Participant) => void
): ColumnDef<Participant>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "fathers_name",
      header: "Father's Name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "church_id",
      header: "Church",
      cell: ({ row }) => {
        const churchId = row.original.church_id;
        const church = churches.find((c) => c.church_id === churchId);
        return <>{church?.church_name ?? "N/A"}</>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const participant = row.original;
        return (
          <div className="flex gap-2">
            <EditDialog title="Edit Participant">
              {(close) => (
                <ParticipantForm
                  existing={participant}
                  churches={churches}
                  onAdd={(upd) => {
                    onUpdate({ ...participant, ...upd });
                    close();
                  }}
                  closeDialog={close}
                />
              )}
            </EditDialog>
            <DeleteDialog
              title="Delete Participant"
              message={`Delete "${participant.name}"?`}
              onConfirm={() => onDelete(participant.participant_id)}
            />
          </div>
        );
      },
    },
  ];
}
