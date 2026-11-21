"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** shadcn/ui Tabs (Radix). Arrow keys follow the reading direction via DirectionProvider. */
export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("flex items-center gap-2", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border-2 border-charcoal bg-cream px-5 text-[15px] font-bold",
        "transition-colors hover:bg-cream-deep",
        "data-[state=active]:bg-charcoal data-[state=active]:text-cream",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("outline-none", className)} {...props} />;
}
