// @/app/dashboard/mediaSpecialties/page.tsx

import { AppSidebar } from "@/components/common/sidebar/app-sidebar";
import { SiteHeader } from "@/components/common/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MediaSpecialtiesTableClient from "@/components/common/tables/client/MediaSpecialtiesTableClient";

export default function MediaSpecialtiesPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <MediaSpecialtiesTableClient />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
