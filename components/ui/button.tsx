import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui Button, restyled: chunky 2px charcoal border with a hard
 * drop shadow that "presses" on click. Shadows are straight down, so they
 * don't need mirroring in RTL.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[14px] border-2 border-charcoal font-bold leading-none",
    "transition-[transform,box-shadow,background-color,color] duration-150",
    "active:translate-y-[3px] active:shadow-none",
    "disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:active:translate-y-0",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-paprika text-cream shadow-[0_4px_0_0_var(--color-charcoal)] hover:bg-paprika-dark",
        outline: "bg-cream text-charcoal shadow-[0_4px_0_0_var(--color-charcoal)] hover:bg-cream-deep",
        dark: "bg-charcoal text-cream shadow-[0_4px_0_0_var(--color-paprika)] hover:bg-black",
        ghost: "border-transparent bg-transparent shadow-none hover:bg-charcoal/5 active:translate-y-0",
      },
      size: {
        md: "h-12 px-5 text-base",
        lg: "h-14 px-7 text-[17px]",
        icon: "size-12",
        iconSm: "size-10 rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element (e.g. an <a>) with button styles. */
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
