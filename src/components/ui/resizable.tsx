"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ResizableDirection = "horizontal" | "vertical";

type ResizablePanelGroupProps = React.ComponentProps<"div"> & {
  direction: ResizableDirection;
};

type ResizablePanelProps = React.ComponentProps<"div"> & {
  defaultSize?: number;
  minSize?: number;
};

const ResizableContext = React.createContext<ResizableDirection>("horizontal");

function ResizablePanelGroup({
  className,
  direction,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <ResizableContext.Provider value={direction}>
      <div
        className={cn(
          "flex h-full w-full",
          direction === "vertical" ? "flex-col" : "flex-row",
          className,
        )}
        {...props}
      />
    </ResizableContext.Provider>
  );
}

function ResizablePanel({
  className,
  defaultSize,
  minSize,
  style,
  ...props
}: ResizablePanelProps) {
  const direction = React.useContext(ResizableContext);

  const sizeStyles: React.CSSProperties = {
    ...(defaultSize ? { flexBasis: `${defaultSize}%` } : {}),
    ...(minSize
      ? direction === "vertical"
        ? { minHeight: `${minSize}%` }
        : { minWidth: `${minSize}%` }
      : {}),
    ...style,
  };

  return (
    <div
      className={cn("min-h-0 min-w-0 flex-1 overflow-hidden", className)}
      style={sizeStyles}
      {...props}
    />
  );
}

function ResizableHandle({ className, ...props }: React.ComponentProps<"div">) {
  const direction = React.useContext(ResizableContext);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-border shrink-0",
        direction === "vertical" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
