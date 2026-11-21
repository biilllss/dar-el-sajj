"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Sheet (Radix Dialog), reduced to the one side we need:
 * it docks to the inline-end edge, so it's on the right in English and
 * on the left in Arabic. Focus trap, Esc to close and scroll lock come from Radix.
 */
export const Sheet = DialogPrimitive.Root;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className="fixed inset-0 z-50 bg-charcoal/60 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
      />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed inset-y-0 end-0 z-50 flex h-dvh w-full flex-col bg-cream outline-none",
          "sm:max-w-[440px] sm:border-s-2 sm:border-charcoal",
          "data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn("font-display text-2xl font-extrabold", className)} {...props} />;
}

export function SheetDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn("text-sm text-muted", className)} {...props} />;
}
