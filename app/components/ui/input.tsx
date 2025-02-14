import * as React from "react";

import { cn } from "#/app/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground ring-primary aria-invalid:outline-destructive/60 aria-invalid:ring-destructive dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive dark:ring-ring dark:outline-ring aria-invalid:outline-destructive dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive aria-invalid:ring-destructive aria-invalid:border-destructive dark:aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4 ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
