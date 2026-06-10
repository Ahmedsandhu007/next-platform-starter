import { ArrowRight } from "lucide-react";
import { type ComponentProps, type ReactNode } from "react";

type Variant = "primary" | "bronze" | "ghost" | "light";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-md font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const sizes = {
  md: "px-7 py-3.5",
  lg: "px-9 py-4 text-[0.74rem]",
};

const variants: Record<Variant, string> = {
  // Profitwise rebrand: solid dark primary that fills orange on hover.
  primary: "bg-ink text-white hover:bg-bronze",
  // Solid orange — the prominent CTA (used on dark surfaces); darkens on hover.
  bronze: "bg-bronze text-white hover:bg-bronze-600",
  // Secondary: white/transparent with a dark border; fills orange on hover.
  ghost: "border border-ink/25 text-ink hover:border-bronze hover:bg-bronze hover:text-white",
  // On dark surfaces: white outline that fills white (dark text) on hover.
  light: "border border-white/50 text-white hover:bg-white hover:text-navy",
};

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: Variant;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
      {withArrow ? (
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      ) : null}
    </a>
  );
}
