import {
    createContext,
    type Dispatch,
    type FC,
    type ReactNode,
    type SetStateAction,
    useContext,
    useState,
} from "react";

interface SidebarContextType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = (): SidebarContextType => {
    const ctx = useContext(SidebarContext);
    if (!ctx) throw new Error("useSidebar must be used inside <SidebarProvider>");
    return ctx;
};

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
            {children}
        </SidebarContext.Provider>
    );
};