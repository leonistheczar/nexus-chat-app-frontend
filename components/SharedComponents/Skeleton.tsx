import type { CSSProperties, HTMLAttributes } from "react";

export type SkeletonVariant = "line" | "circle" | "rectangle" | "rounded";

export interface SkeletonProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Shape preset. Use `className` or dimensions to customize its size. */
  variant?: SkeletonVariant;
  /** CSS size (for example `"100%"`, `"12rem"`, or `240`). */
  width?: CSSProperties["width"];
  /** CSS size (for example `"1.25rem"` or `40`). */
  height?: CSSProperties["height"];
  /** Optional announcement for assistive technology while content loads. */
  label?: string;
}

const variantClasses: Record<SkeletonVariant, string> = {
  line: "h-4 w-full rounded-md",
  circle: "size-10 rounded-full",
  rectangle: "h-24 w-full rounded-xl",
  rounded: "h-10 w-full rounded-xl",
};

/**
 * A responsive, theme-aware placeholder primitive for loading content.
 * Add `className`, `width`, and `height` to match the shape of the UI it replaces.
 */
export default function Skeleton({
  variant = "line",
  width,
  height,
  label,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const dimensions: CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <span
      {...props}
      className={`block max-w-full shrink-0 bg-background-200/80 motion-safe:animate-pulse ${variantClasses[variant]} ${className}`.trim()}
      style={dimensions}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      aria-live={label ? "polite" : undefined}
      role={label ? "status" : undefined}
    />
  );
}
