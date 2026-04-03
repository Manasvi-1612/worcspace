"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import type {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction
} from 'react'

import { ChevronDownIcon } from "lucide-react";

import { cn } from "../../lib/cn";
import { Button } from "./button";

const base = "w-max relative";
const trigger = "w-full justify-between";
const content =
    "absolute top-[110%] left-0 z-20 min-w-full w-max bg-white border border-secondary/10 rounded-lg p-1 transition-transform origin-top";
const list = "w-full flex flex-col gap-1";
const item = "w-full";

interface SelectEventPropsType {
    name: string;
    value: string | boolean;
}

interface SelectContextPropsType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    defaultValue: string | boolean;
    setDefaultValue: Dispatch<SetStateAction<string | boolean>>;
    name?: string;
    onSelect?: (event: SelectEventPropsType) => void;
}

const SelectContext = createContext<SelectContextPropsType | undefined>(
    undefined
);

const useSelectContext = (): SelectContextPropsType => {
    const context = useContext(SelectContext);

    if (!context) throw new Error("SELECT_CONTEXT is missing!");

    return context;
};

interface SelectPropsType {
    children?: ReactNode;
    name?: string;
    value?: string | boolean;
    onSelect?: (event: SelectEventPropsType) => void;
    className?: string;
}

const Select: FC<SelectPropsType> = ({
    children,
    name,
    value,
    onSelect,
    className,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [defaultValue, setDefaultValue] = useState<string | boolean>(
        value ?? ""
    );

    useEffect(() => {
        const handleUpdateDefaultValue = () => setDefaultValue(value ?? "");
        handleUpdateDefaultValue();
    }, [value]);

    const ref = useRef<HTMLDivElement | null>(null);

    const handleSetIsOpen = (event: MouseEvent): void => {
        if (ref.current && !ref.current.contains(event.target as Node) && isOpen)
            setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleSetIsOpen);
        return () => document.removeEventListener("mouseup", handleSetIsOpen);
    }, [isOpen]);

    return (
        <SelectContext.Provider
            value={{
                isOpen,
                setIsOpen,
                defaultValue,
                setDefaultValue,
                name,
                onSelect,
            }}
        >
            <div ref={ref} className={cn(base, className ?? "")}>
                {children}
            </div>
        </SelectContext.Provider>
    );
};

interface SelectTriggerPropsType {
    children?: ReactNode;
    disabled?: boolean;
    className?: string;
}

const SelectTrigger: FC<SelectTriggerPropsType> = ({
    children,
    disabled,
    className,
}) => {
    const { isOpen, setIsOpen, defaultValue } = useSelectContext();

    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(trigger, className ?? "")}
            disabled={disabled}
        >
            {children ?? defaultValue}
            <ChevronDownIcon
                className={cn(
                    "w-4 h-4 ms-4 transition-transform",
                    isOpen ? "rotate-180" : "rotate-0"
                )}
            />
        </Button>
    );
};

interface SelectListPropsType {
    children?: ReactNode;
    className?: string;
}

const SelectList: FC<SelectListPropsType> = ({ children, className }) => {
    const { isOpen, setIsOpen } = useSelectContext();

    return (
        <div
            className={cn(
                content,
                isOpen ? "scale-y-100" : "scale-y-0",
                className ?? ""
            )}
        >
            <ul className={list}>{children}</ul>
        </div>
    );
};

interface SelectItemPropsType {
    children?: ReactNode;
    value?: string | boolean;
    disabled?: boolean;
    className?: string;
}

const SelectItem: FC<SelectItemPropsType> = ({
    children,
    value,
    disabled,
    className,
}) => {
    const { setIsOpen, defaultValue, setDefaultValue, name, onSelect } =
        useSelectContext();

    const handleOnItemSelect = (): void => {
        onSelect && onSelect({ name: name ?? "", value: value ?? "" });
        setDefaultValue(value ?? "");
        setIsOpen(false);
    };

    return (
        <Button
            type="button"
            variant={defaultValue === value ? "secondary" : "ghost"}
            onClick={handleOnItemSelect}
            className={cn(item, className ?? "")}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

export {
    type SelectEventPropsType,
    Select,
    SelectTrigger,
    SelectList,
    SelectItem,
};