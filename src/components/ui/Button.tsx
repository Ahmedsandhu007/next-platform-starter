import { ArrowRight } from "lucide-react";
import { type ComponentProps, type ReactNode } from "react";

type Variant = "primary" | "bronze" | "ghost" | "light";

const base =
  "group inline-flex items-center justify-center gap-2.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const sizes = {
  md: "px-7 py-3.5",
  lg: "px-9 py-4 text-[0.74rem]",
};

const variants: Record<Variant, string> = {
  // Accent lives on the BORDER with a transparent fill; the fill appears on hover
  // (reference-style outline buttons).
  primary: "border border-bronze text-ink hover:bg-bronze hover:text-white",
  bronze: "border border-bronze-400 text-white hover:border-bronze hover:bg-bronze hover:text-white",
  ghost: "border border-ink/30 text-ink hover:bg-ink hover:text-white",
  light: "border border-white/45 text-white hover:bg-white hover:text-navy",
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
