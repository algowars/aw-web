"use client";

import { useEffect } from "react";

import { Editor, type Tab } from "@/editor/editor";
import { useEditorStore } from "@/editor/editor-store";

type ProblemEditorPocTabs = Tab;

const createPocTabs = (): ProblemEditorPocTabs => ({
  key: "problem-editor-root",
  children: [
    {
      key: "description-tab",
      name: "Description",
      component: (
        <div className="text-muted-foreground p-4 text-sm">
          it works fr poc description
        </div>
      ),
    },
    {
      key: "solution-tab",
      name: "Solution",
      component: (
        <div className="text-muted-foreground p-4 text-sm">
          it works fr poc solution
        </div>
      ),
    },
    {
      key: "tests-tab",
      name: "Tests",
      component: (
        <div className="text-muted-foreground p-4 text-sm">
          it works fr poc tests
        </div>
      ),
    },
  ],
});

export const ProblemEditorPoc = () => {
  const createTabs = useEditorStore((state) => state.createTabs);
  const clearTabs = useEditorStore((state) => state.clearTabs);

  useEffect(() => {
    createTabs(createPocTabs());

    return () => {
      clearTabs();
    };
  }, [clearTabs, createTabs]);

  return <Editor />;
};
