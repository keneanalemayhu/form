// @/components/common/sidebar/app-sidebar.tsx

"use client"
import * as React from "react"
import {
  IconSquareLetterJ,
  IconBuildingChurch,
  IconUsers,
  IconCertificate,
  IconSchool,
  IconStars, 
} from "@tabler/icons-react"

import { NavMain } from "@/components/common/sidebar/nav-main"
import { NavUser } from "@/components/common/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Abebe Kebede",
    email: "abebekebede@example.com",
  },
  navMain: [
    {
      title: "Churches",
      url: "/dashboard/churches",
      icon: IconBuildingChurch,
    },
    {
      title: "Media Specialties",
      url: "/dashboard/mediaSpecialties",
      icon: IconStars,
    },
    {
      title: "Participants",
      url: "/dashboard/participants",
      icon: IconUsers,
    },
    {
      title: "Participant Skills",
      url: "/dashboard/participantSkills",
      icon: IconCertificate,
    },
    {
      title: "Training Details",
      url: "/dashboard/participantTrainingDetails",
      icon: IconSchool,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconSquareLetterJ className="!size-5" />
                <span className="text-base font-semibold">JirehGroup</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
