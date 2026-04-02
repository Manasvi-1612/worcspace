import {
  type ChangeEventHandler,
  type FC,
  type FocusEventHandler,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import { cn } from "../../lib/cn";

const base =
  "w-full border rounded-lg text-sm leading-normal font-normal transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

const lightStyles =
  "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-ring";

const darkStyles =
  "bg-primary-light border-primary-border text-text-light placeholder:text-text-placeholder focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-ring";

const sizes = {
  sm: "h-8 px-2.5 py-1.5 text-xs",
  md: "h-9 px-3 py-2",
  lg: "h-11 px-4 py-2.5 text-base",
};

export type InputSize = keyof typeof sizes;
export type InputTheme = "light" | "dark";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search" | "url" | "tel";
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  className?: string;
  size?: InputSize;
  theme?: InputTheme;
  label?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

const Input: FC<InputProps> = ({
  type = "text",
  value,
  defaultValue,
  onChange,
  disabled,
  readOnly,
  placeholder,
  id,
  name,
  onFocus,
  onBlur,
  className,
  size = "md",
  theme = "light",
  label,
  leftSlot,
  rightSlot,
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isDark = theme === "dark";

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const labelEl = label ? (
    <label
      htmlFor={inputId}
      className={cn(
        "block text-xs font-medium mb-1.5",
        isDark ? "text-text-muted" : "text-zinc-600",
      )}
    >
      {label}
    </label>
  ) : null;

  if (leftSlot || rightSlot) {
    return (
      <div className="w-full">
        {labelEl}
        <div
          className={cn(
            "flex items-center w-full border rounded-lg transition-all duration-200",
            "focus-within:ring-2 focus-within:ring-primary-ring focus-within:border-primary",
            isDark
              ? "bg-primary-light border-primary-border"
              : "bg-white border-zinc-200",
            sizes[size],
            disabled ? "opacity-50 pointer-events-none" : "",
          )}
        >
          {leftSlot && (
            <span className="shrink-0 flex items-center mr-2">{leftSlot}</span>
          )}
          <input
            type={type}
            ref={inputRef}
            id={inputId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none text-sm leading-normal",
              isDark
                ? "text-text-light placeholder:text-text-placeholder"
                : "text-zinc-900 placeholder:text-zinc-400",
              className ?? "",
            )}
          />
          {rightSlot && (
            <span className="shrink-0 flex items-center ml-2">{rightSlot}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {labelEl}
      <input
        type={type}
        ref={inputRef}
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          base,
          isDark ? darkStyles : lightStyles,
          sizes[size],
          className ?? "",
        )}
      />
    </div>
  );
};

export { Input };
