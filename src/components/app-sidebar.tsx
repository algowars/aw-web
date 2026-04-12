"use client";

import * as React from "react";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Code2Icon,
  TrophyIcon,
  BookOpenCheckIcon,
  HouseIcon,
} from "lucide-react";
import { routerConfig } from "@/router-config";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: routerConfig.dashboard.path,
      icon: <HouseIcon />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: routerConfig.dashboard.path,
        },
      ],
    },
    {
      title: "Problems",
      url: routerConfig.problems.path,
      icon: <BookOpenCheckIcon />,
      items: [
        {
          title: "All Problems",
          url: routerConfig.problems.path,
        },
      ],
    },
    {
      title: "Leaderboards",
      url: routerConfig.leaderboards.path,
      icon: <TrophyIcon />,
      items: [
        {
          title: "Global Rankings",
          url: routerConfig.leaderboards.path,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const homeHref = user ? routerConfig.dashboard.path : routerConfig.home.path;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={homeHref}>
                <span className="bg-primary text-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-md">
                  <Code2Icon className="size-4 shrink-0" />
                </span>
                <span className="truncate font-semibold">Algowars</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
