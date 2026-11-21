import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** shadcn/ui-style Label, Input and Textarea, on the site's palette. */

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-sm font-bold", className)} {...props} />;
}

const fieldBase =
  "w-full rounded-[14px] border-2 border-charcoal/25 bg-paper px-4 text-base text-charcoal placeholder:text-muted/80 transition-colors hover:border-charcoal/50 focus-visible:border-charcoal";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-24 resize-y py-3", className)} {...props} />;
}
