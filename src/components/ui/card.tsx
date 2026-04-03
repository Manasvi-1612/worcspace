import type { FC, ReactNode } from "react";

import { cn } from "../../lib/cn";

const base = "p-4 border border-secondary/10 rounded-lg max-w-md w-full bg-white";
const header = "w-full mb-4";
const title = "text-lg leading-normal font-semibold text-foreground";
const description = "text-sm leading-normal font-normal text-foreground-muted";
const body = "w-full mb-6";
const footer = "flex items-center text-foreground-muted";

interface CardCommonPropsType {
    children?: ReactNode;
    className?: string;
}

const Card: FC<CardCommonPropsType> = ({ children, className }) => {
    return <div className={cn(base, className ?? "")}>{children}</div>;
};

const CardHeader: FC<CardCommonPropsType> = ({ children, className }) => {
    return <div className={cn(header, className ?? "")}>{children}</div>;
};

const CardTitle: FC<CardCommonPropsType> = ({ children, className }) => {
    return <h3 className={cn(title, className ?? "")}>{children}</h3>;
};

const CardDescription: FC<CardCommonPropsType> = ({ children, className }) => {
    return <p className={cn(description, className ?? "")}>{children}</p>;
};

const CardBody: FC<CardCommonPropsType> = ({ children, className }) => {
    return <div className={cn(body, className ?? "")}>{children}</div>;
};

const CardFooter: FC<CardCommonPropsType> = ({ children, className }) => {
    return <div className={cn(footer, className ?? "")}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter };