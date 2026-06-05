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
  primary: "bg-ink text-white hover:bg-bronze",
  bronze: "bg-bronze text-white hover:bg-bronze-600",
  ghost: "border border-ink text-ink hover:bg-ink hover:text-white",
  light: "border border-white/40 text-white hover:bg-white hover:text-ink",
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
