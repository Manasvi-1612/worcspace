import {
    createContext,
    useContext,
} from "react";

import type { FC, ReactNode, Dispatch, SetStateAction } from "react";

import { XIcon } from "lucide-react";

import { Button } from "./button";
import { cn } from "../../lib/cn";

const base = "w-max";
const overlay =
    "fixed top-0 left-0 z-20 h-[100svh] w-full bg-black/80 transition-opacity duration-300 ease-out";
const content =
    "fixed top-0 z-20 h-full max-w-lg w-full bg-white transition-transform duration-300 ease-linear";
const header =
    "w-full flex items-start justify-between p-4 border-b border-secondary/10";
const title = "text-lg leading-normal font-semibold text-foreground";
const description = "text-sm leading-normal font-normal text-foreground-muted";
const body = "w-full text-sm leading-normal font-normal text-foreground";

interface SheetContextPropsType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SheetContext = createContext<SheetContextPropsType | undefined>(
    undefined
);

const useSheetContext = (): SheetContextPropsType => {
    const context = useContext(SheetContext);

    if (!context) throw new Error("SHEET_CONTEXT is missing!");

    return context;
};

interface SheetPropsType {
    children?: ReactNode;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sheet: FC<SheetPropsType> = ({ children, isOpen, setIsOpen }) => {
    return (
        <SheetContext.Provider value={{ isOpen, setIsOpen }}>
            <div className={base}>{children}</div>
        </SheetContext.Provider>
    );
};

interface SheetTriggerPropsType {
    children?: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "link" | "surface";
    disabled?: boolean;
    className?: string;
}

const SheetTrigger: FC<SheetTriggerPropsType> = ({
    children,
    variant,
    disabled,
    className,
}) => {
    const { setIsOpen } = useSheetContext();

    const handleSetIsOpen = (): void => setIsOpen(true);

    return (
        <Button
            type="button"
            variant={variant}
            onClick={handleSetIsOpen}
            className={className}
            disabled={disabled}
        >
            {children}
        </Button>
    );
};

interface SheetCommonPropsType {
    children?: ReactNode;
    position?: "left" | "right";
    className?: string;
}

const SheetContent: FC<SheetCommonPropsType> = ({
    children,
    position,
    className,
}) => {
    const { isOpen, setIsOpen } = useSheetContext();

    const handleSetIsOpen = (): void => setIsOpen(false);

    return (
        <>
            <div
                onClick={handleSetIsOpen}
                className={cn(
                    overlay,
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
            />
            <div
                className={cn(
                    content,
                    position === "left"
                        ? `left-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`
                        : `right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`,
                    className ?? ""
                )}
            >
                {children}
            </div>
        </>
    );
};

interface SheetCommonPropsType {
    children?: ReactNode;
    className?: string;
}

const SheetHeader: FC<SheetCommonPropsType> = ({ children, className }) => {
    const { setIsOpen } = useSheetContext();

    const handleSetIsOpen = (): void => setIsOpen(false);

    return (
        <div className={cn(header, className ?? "")}>
            {children}
            <Button type="button" variant="ghost" size='icon' onClick={handleSetIsOpen}>
                <XIcon className="w-4 h-4" />
            </Button>
        </div>
    );
};

const SheetTitle: FC<SheetCommonPropsType> = ({ children, className }) => {
    return <h3 className={cn(title, className ?? "")}>{children}</h3>;
};

const SheetDescription: FC<SheetCommonPropsType> = ({
    children,
    className,
}) => {
    return <p className={cn(description, className ?? "")}>{children}</p>;
};

const SheetBody: FC<SheetCommonPropsType> = ({ children, className }) => {
    return <div className={cn(body, className ?? "")}>{children}</div>;
};

export {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetBody,
};