import type * as React from "react";
import { cn } from "#/app/lib/utils";

export function Heading1({
  children,
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Heading2({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Heading3({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Heading4({
  children,
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function Paragraph({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}
