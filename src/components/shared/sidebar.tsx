import { useState } from "react";
import {
    Bot, BrainCircuit, BookMarked, Send, Monitor, AlignJustify,
    Zap, Play, FolderKey, ShieldCheck, Contact, Server,
    BarChart2, CheckCheck, Users, Archive, LifeBuoy,
    type LucideIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/cn";
import { projects, orchestrator, admin } from "../../lib/constant";
import { useSidebar } from "../../context/sidebar-context";

const iconMap: Record<string, LucideIcon> = {
    Agents: Bot, "AI Models": BrainCircuit, Library: BookMarked,
    Published: Send, Machines: Monitor, Queues: AlignJustify,
    Triggers: Zap, Jobs: Play, "Key Store": FolderKey, Vault: ShieldCheck,
    Tenant: Contact, "On-Prem Models": Server, Usage: BarChart2,
    Approvals: CheckCheck, Users: Users, Archive: Archive, Support: LifeBuoy,
};

const NavItem = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => {
    const Icon = iconMap[label] ?? Bot;
    return (
        <li className="relative">
            {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-primary rounded-full" />
            )}
            <Button
                variant="link"
                size="md"
                onClick={onClick}
                className={cn(
                    "h-10 px-3 gap-3 rounded-lg",
                    isActive
                        ? "bg-primary-light text-primary font-medium hover:bg-primary-light"
                        : "text-secondary hover:text-secondary-hover",
                )}
            >
                <Icon size={18} strokeWidth={1.6} className={cn("shrink-0", isActive ? "text-primary" : "")} />
                <span className="text-[13.5px] leading-none">{label}</span>
            </Button>
        </li>
    );
};

const NavSection = ({ title, items, activeItem, onSelect }: {
    title: string; items: string[]; activeItem: string; onSelect: (i: string) => void;
}) => (
    <div className="flex flex-col gap-0.5">
        <p className="px-2 mx-2 mb-1 text-xs font-medium tracking-widest uppercase text-gray-500 select-none whitespace-nowrap">
            {title}
        </p>
        <ul className="flex flex-col gap-0.5 pl-1">
            {items.map((item) => (
                <NavItem key={item} label={item} isActive={activeItem === item} onClick={() => onSelect(item)} />
            ))}
        </ul>
    </div>
);

const Divider = () => <hr className="border-t border-secondary/10 my-2 mx-4" />;

const NavContent = ({ activeItem, onSelect }: { activeItem: string; onSelect: (i: string) => void }) => (
    <nav className="flex flex-col gap-3">
        <NavSection title={projects.title} items={projects.items} activeItem={activeItem} onSelect={onSelect} />
        <Divider />
        <NavSection title={orchestrator.title} items={orchestrator.items} activeItem={activeItem} onSelect={onSelect} />
        <Divider />
        <NavSection title={admin.title} items={admin.items} activeItem={activeItem} onSelect={onSelect} />
    </nav>
);

export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("Library");
    const { isOpen, setIsOpen } = useSidebar();

    const handleSelect = (item: string) => {
        setActiveItem(item);
        setIsOpen(false);
    };

    return (
        <>

            <aside className="hidden lg:flex h-full w-56 flex-col shrink-0 overflow-y-auto overflow-x-hidden bg-white py-4 pr-2 border-r border-secondary/10">
                <NavContent activeItem={activeItem} onSelect={handleSelect} />
            </aside>

            <div
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
                className={cn(
                    "lg:hidden fixed inset-0 z-20 bg-black/40 transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                )}
            />

            <aside
                className={cn(
                    "lg:hidden fixed top-0 left-0 z-30 h-full w-56 flex flex-col shrink-0",
                    "overflow-y-auto overflow-x-hidden bg-white py-4 pr-2",
                    "border-r border-secondary/10 shadow-xl",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <NavContent activeItem={activeItem} onSelect={handleSelect} />
            </aside>
        </>
    );
};