// @/components/common/forms/ChurchForm.tsx

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Church } from "@/types";
import { ChurchProps as Props } from "@/types";

export function ChurchForm({ onAdd, closeDialog, existing }: Props) {
  const [church_name, setChurchName] = useState(existing?.church_name ?? "");

  const handleSubmit = () => {
    if (!church_name.trim()) return;

    const newChurch = {
      church_name,
      ...(existing?.church_id !== undefined && { church_id: existing.church_id }),
    };

    onAdd?.(newChurch as Omit<Church, "church_id" | "created_at" | "updated_at">);

    closeDialog?.();
    setChurchName("");
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="grid gap-3 py-2 px-1 text-sm max-w-md">
      <div className="flex items-center gap-4">
        <label className="w-36 text-sm font-medium text-right">Church Name <span className="text-red-500">*</span></label>
        <Input className="w-full" value={church_name} onChange={(e) => setChurchName(e.target.value)} placeholder="Enter church name" />
      </div>
      <div className="flex justify-end gap-4 pt-1 pb-1">
        <Button variant="outline" type="button" onClick={closeDialog}>Cancel</Button>
        <Button type="submit">{existing ? "Update" : "Add"}</Button>
      </div>
    </form>
  );
}
