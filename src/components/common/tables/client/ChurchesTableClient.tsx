// @/components/common/tables/client/ChurchesTableClient.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/common/tables/common/data-table";
import { useChurchTable } from "@/hooks/tables/useChurchTable";
import { useChurchColumns } from "@/components/common/tables/columns/churches";
import { AddDialog } from "@/components/common/dialogs/AddDialog";
import { ChurchForm } from "@/components/common/forms/ChurchForm";

export default function ChurchesTableClient() {
  const { data, addChurch, updateChurch, deleteChurch } = useChurchTable();
  const columns = useChurchColumns(deleteChurch, updateChurch);
  const [search, setSearch] = useState("");

  const filtered = data.filter((c) => c.church_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="flex flex-col items-start gap-1 mb-2 px-2 md:px-4">
        <h2 className="text-2xl font-bold">Churches</h2>
        <p className="text-muted-foreground text-sm">Manage churches in the system.</p>
      </div>
      <div className="flex items-center justify-between px-2 md:px-4">
        <Input placeholder="Search churches..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        <AddDialog title="Add Church">
          {(close) => <ChurchForm onAdd={(c) => addChurch(c)} closeDialog={close} />}
        </AddDialog>
      </div>
      <div className="px-2 md:px-4">
        <DataTable columns={columns} data={filtered} />
      </div>
    </>
  );
}
