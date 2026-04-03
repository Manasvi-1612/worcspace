import type { FC, MouseEventHandler, ReactNode } from "react";
import { cn } from "../../lib/cn";

const base =
  "inline-flex items-center justify-center border rounded-lg font-medium text-sm leading-none transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-95";

const variants = {
  primary:
    "bg-primary hover:bg-primary-hover border-primary hover:border-primary-hover text-white shadow-sm",
  secondary:
    "bg-secondary hover:bg-secondary-hover border-secondary hover:border-secondary-hover text-white",
  surface:
    "bg-surface hover:bg-surface-hover border-primary-border text-text-muted hover:text-text-light",
  outline:
    "bg-transparent hover:bg-surface border-primary-border hover:border-primary text-foreground-muted hover:text-foreground",
  ghost:
    "bg-transparent hover:bg-surface border-transparent text-secondary hover:text-secondary-hover",
  danger:
    "bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white",
  link: "bg-transparent border-transparent hover:bg-surface text-secondary hover:text-secondary-hover font-normal justify-start w-full rounded-lg",
};

const sizes = {
  sm: "h-6 px-3 text-xs gap-1.5",
  md: "h-9 px-4 gap-2",
  lg: "h-11 px-5 gap-2 text-base",
  icon: "h-9 w-9 p-0",
  "icon-sm": "h-8 w-8 p-0",
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

interface ButtonProps {
  children?: ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled,
  className,
  variant = "primary",
  size = "md",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], sizes[size], className ?? "")}
    >
      {children}
    </button>
  );
};

export { Button };