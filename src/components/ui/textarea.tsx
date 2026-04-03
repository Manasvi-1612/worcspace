import {
    type ChangeEventHandler,
    type FC,
    type FocusEventHandler,
    useId,
} from "react";
import { cn } from "../../lib/cn";

const base =
    "w-full border rounded-lg text-sm leading-normal font-normal transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 resize-y";

const lightStyles =
    "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-ring";

const darkStyles =
    "bg-primary-light border-primary-border text-text-light placeholder:text-text-placeholder focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-ring";

const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2",
    lg: "px-4 py-2.5 text-base",
};

export type TextareaSize = keyof typeof sizes;
export type TextareaTheme = "light" | "dark";

interface TextareaProps {
    value?: string;
    defaultValue?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    id?: string;
    name?: string;
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    className?: string;
    size?: TextareaSize;
    theme?: TextareaTheme;
    label?: string;
    rows?: number;
    /** Prevent manual resizing */
    noResize?: boolean;
}

const Textarea: FC<TextareaProps> = ({
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
    rows = 4,
    noResize = false,
}) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const isDark = theme === "dark";

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={textareaId}
                    className={cn(
                        "block text-xs font-medium mb-1.5",
                        isDark ? "text-text-muted" : "text-zinc-600",
                    )}
                >
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                name={name}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                rows={rows}
                className={cn(
                    base,
                    isDark ? darkStyles : lightStyles,
                    sizes[size],
                    noResize ? "resize-none" : '',
                    className ?? '',
                )}
            />
        </div>
    );
};

export { Textarea };