// @/components/common/tables/columns/mediaSpecialties.tsx

"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { MediaSpecialty } from "@/types/tables/mediaSpecialty";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/common/dialogs/EditDialog";
import { DeleteDialog } from "@/components/common/dialogs/DeleteDialog";
import { MediaSpecialtyForm } from "@/components/common/forms/MediaSpecialtyForm";

export function useMediaSpecialtyColumns(
  onDelete: (id: number) => void,
  onUpdate: (item: MediaSpecialty) => void
): ColumnDef<MediaSpecialty>[] {
  return [
    {
      accessorKey: "specialty_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Specialty Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const specialty = row.original;
        return (
          <div className="flex gap-2">
            <EditDialog title="Edit Specialty">
              {(close) => (
                <MediaSpecialtyForm
                  existing={specialty}
                  onAdd={(upd) => {
                    onUpdate({ ...specialty, ...upd });
                    close();
                  }}
                  closeDialog={close}
                />
              )}
            </EditDialog>
            <DeleteDialog
              title="Delete Specialty"
              message={`Delete "${specialty.specialty_name}"?`}
              onConfirm={() => onDelete(specialty.specialty_id)}
            />
          </div>
        );
      },
    },
  ];
}
