import type { ReactNode } from "react"
import { Input } from "../ui/input"
import { Search } from "lucide-react"


export const ComponentLayout = ({ children, title, footer, headerActions }: { children: ReactNode, title: string, footer?: ReactNode, headerActions?: ReactNode }) => {
    return (
        <div className="flex flex-col h-full py-4 px-7 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <p className="flex w-full items-center truncate text-lg sm:text-xl font-medium text-foreground">
                    {title}
                </p>
                <div className="flex items-center gap-2">
                    <div className="max-md:hidden">
                        <Input type='search' placeholder="Search..." leftSlot={<Search className="size-4 text-zinc-400" />} />
                    </div>
                    {headerActions}
                </div>
            </div>

            <div className="flex-1 overflow-y-scroll">{children}</div>
            {footer && (
                <>
                    {footer}
                </>
            )}
        </div>
    )
}
