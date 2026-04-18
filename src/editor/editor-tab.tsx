"use client";

import { Fragment, useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import type { Tab } from "./editor";
import { EditorPanelHeader } from "./editor-panel-header";

type EditorTabProps = {
  tab: Tab;
};

export const EditorTab = ({ tab }: EditorTabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!tab.children || tab.children.length === 0) {
      setActiveTab(0);
      return;
    }

    if (activeTab > tab.children.length - 1) {
      setActiveTab(0);
    }
  }, [activeTab, tab.children]);

  const panelChildren = tab.children;

  if (tab.direction && panelChildren?.length) {
    return (
      <ResizablePanelGroup className="h-full w-full" direction={tab.direction}>
        {panelChildren.map((childTab, index) => (
          <Fragment key={childTab.key}>
            <ResizablePanel defaultSize={childTab.defaultSize} minSize={10}>
              <EditorTab tab={childTab} />
            </ResizablePanel>
            {index !== panelChildren.length - 1 ? (
              <ResizableHandle className="bg-inherit p-1" />
            ) : null}
          </Fragment>
        ))}
      </ResizablePanelGroup>
    );
  }

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const currentTab = tab.children?.[activeTab] ?? tab;

  return (
    <Card className="bg-sidebar h-full gap-0 overflow-hidden py-0">
      <EditorPanelHeader
        tab={tab}
        currentTabIndex={activeTab}
        setCurrentTab={handleTabClick}
      />
      <div className="min-h-0 flex-1 overflow-auto">{currentTab.component}</div>
    </Card>
  );
};
