import { useState } from "react";
import {
    Bot,
    BrainCircuit,
    BookMarked,
    Send,
    Monitor,
    AlignJustify,
    Zap,
    Play,
    FolderKey,
    ShieldCheck,
    Contact,
    Server,
    BarChart2,
    CheckCheck,
    Users,
    Archive,
    LifeBuoy,
    type LucideIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/cn";
import { projects, orchestrator, admin } from "../../lib/constant";


const iconMap: Record<string, LucideIcon> = {
    Agents: Bot,
    "AI Models": BrainCircuit,
    Library: BookMarked,
    Published: Send,
    Machines: Monitor,
    Queues: AlignJustify,
    Triggers: Zap,
    Jobs: Play,
    "Key Store": FolderKey,
    Vault: ShieldCheck,
    Tenant: Contact,
    "On-Prem Models": Server,
    Usage: BarChart2,
    Approvals: CheckCheck,
    Users: Users,
    Archive: Archive,
    Support: LifeBuoy,
};
interface NavItemProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem = ({ label, isActive, onClick }: NavItemProps) => {
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
                        : "text-secondary hover:text-secondary-hover"
                )}
            >
                <Icon
                    size={18}
                    strokeWidth={1.6}
                    className={cn(
                        "shrink-0 transition-colors",
                        isActive ? "text-primary" : ""
                    )}
                />
                <span className="text-[13.5px] leading-none">{label}</span>
            </Button>
        </li>
    );
};

interface NavSectionProps {
    title: string;
    items: string[];
    activeItem: string;
    onSelect: (item: string) => void;
}

const NavSection = ({ title, items, activeItem, onSelect }: NavSectionProps) => (
    <div className="flex flex-col gap-0.5">
        <p className="px-2 mx-2 mb-1 text-xs font-medium tracking-widest whitespace-nowrap uppercase text-gray-500  select-none">
            {title}
        </p>
        <ul className="flex flex-col gap-0.5 pl-1">
            {items.map((item) => (
                <NavItem
                    key={item}
                    label={item}
                    isActive={activeItem === item}
                    onClick={() => onSelect(item)}
                />
            ))}
        </ul>
    </div>
);

const Divider = () => (
    <hr className="border-t border-secondary/10 my-2 mx-4" />
);

export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("Library");

    return (
        <aside className="h-full w-56 flex flex-col overflow-y-auto overflow-x-hidden bg-white py-4 pr-2 border-r border-secondary/10">
            <nav className="flex flex-col gap-3">
                <NavSection
                    title={projects.title}
                    items={projects.items}
                    activeItem={activeItem}
                    onSelect={setActiveItem}
                />

                <Divider />

                <NavSection
                    title={orchestrator.title}
                    items={orchestrator.items}
                    activeItem={activeItem}
                    onSelect={setActiveItem}
                />

                <Divider />

                <NavSection
                    title={admin.title}
                    items={admin.items}
                    activeItem={activeItem}
                    onSelect={setActiveItem}
                />
            </nav>
        </aside>
    );
};