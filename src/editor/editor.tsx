"use client";

import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

import { EditorTab } from "./editor-tab";
import { useEditorStore } from "./editor-store";

export type Tab = {
  component?: ReactNode;
  headerComponent?: ReactNode;
  icon?: ReactNode;
  key: string;
  children?: Tab[];
  name?: string;
  direction?: "horizontal" | "vertical";
  defaultSize?: number;
};

export const Editor = () => {
  const tabs = useEditorStore((state) => state.tabs);

  if (!tabs) {
    return (
      <Card className="bg-sidebar text-muted-foreground h-full w-full items-center justify-center p-6 text-sm">
        No editor tabs open.
      </Card>
    );
  }

  return <EditorTab tab={tabs} />;
};
