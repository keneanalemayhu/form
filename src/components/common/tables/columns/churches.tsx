// @/components/common/tables/columns/church.tsx

"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Church } from "@/types";
import { Button } from "@/components/ui/button";
import { EditDialog } from "@/components/common/dialogs/EditDialog";
import { DeleteDialog } from "@/components/common/dialogs/DeleteDialog";
import { ChurchForm } from "@/components/common/forms/ChurchForm";

export function useChurchColumns(onDelete: (id: number) => void, onUpdate: (c: Church) => void): ColumnDef<Church>[] {
  return [
    {
      accessorKey: "church_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Church Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const church = row.original;
        return (
          <div className="flex gap-2">
            <EditDialog title="Edit Church">
              {(close) => <ChurchForm existing={church} onAdd={(upd) => { onUpdate({ ...church, ...upd }); close(); }} closeDialog={close} />}
            </EditDialog>
            <DeleteDialog title="Delete Church" message={`Delete "${church.church_name}"?`} onConfirm={() => onDelete(church.church_id)} />
          </div>
        );
      },
    },
  ];
}
