import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/cn"


interface PaginationProps {
    totalItems: number
    pageSizeOptions?: number[]
    defaultPageSize?: number
    defaultPage?: number
    onPageChange?: (page: number) => void
    onPageSizeChange?: (size: number) => void
    label?: string
}


const PageSizeSelect = ({
    value,
    options,
    onChange,
}: {
    value: number
    options: number[]
    onChange: (v: number) => void
}) => (
    <div className="relative inline-flex items-center">
        <select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={cn(
                "appearance-none h-9 pl-3 pr-8 rounded-lg border border-zinc-200",
                "bg-white text-secondary text-sm font-medium",
                "focus:outline-none focus:ring-2 focus:ring-primary-ring focus:border-primary",
                "cursor-pointer transition-colors hover:border-zinc-300"
            )}
        >
            {options.map((o) => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
        <ChevronRight
            size={14}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-zinc-400"
        />
    </div>
)


const NavBtn = ({
    onClick,
    disabled,
    children,
}: {
    onClick: () => void
    disabled: boolean
    children: React.ReactNode
}) => (
    <Button
        variant="outline"
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className="border-zinc-200 text-zinc-500 hover:text-secondary disabled:opacity-40"
    >
        {children}
    </Button>
)


export const Pagination = ({
    totalItems,
    pageSizeOptions = [8, 16, 24, 48],
    defaultPageSize = 8,
    defaultPage = 1,
    onPageChange,
    onPageSizeChange,
    label = "Items per page",
}: PaginationProps) => {
    const [pageSize, setPageSize] = useState(defaultPageSize)
    const [page, setPage] = useState(defaultPage)

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

    const goTo = (p: number) => {
        const clamped = Math.min(Math.max(1, p), totalPages)
        setPage(clamped)
        onPageChange?.(clamped)
    }

    const handlePageSize = (size: number) => {
        setPageSize(size)
        setPage(1)
        onPageSizeChange?.(size)
        onPageChange?.(1)
    }

    return (
        <div className="flex items-center justify-end gap-6 lg:gap-8 px-1 py-3">

            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-secondary whitespace-nowrap">
                    {label}
                </span>
                <PageSizeSelect
                    value={pageSize}
                    options={pageSizeOptions}
                    onChange={handlePageSize}
                />
            </div>

            <span className="text-sm font-medium text-secondary">
                Page {page} of {totalPages}
            </span>


            <div className="flex items-center gap-1.5">
                <NavBtn onClick={() => goTo(1)} disabled={page === 1}>
                    <ChevronsLeft size={15} />
                </NavBtn>
                <NavBtn onClick={() => goTo(page - 1)} disabled={page === 1}>
                    <ChevronLeft size={15} />
                </NavBtn>
                <NavBtn onClick={() => goTo(page + 1)} disabled={page === totalPages}>
                    <ChevronRight size={15} />
                </NavBtn>
                <NavBtn onClick={() => goTo(totalPages)} disabled={page === totalPages}>
                    <ChevronsRight size={15} />
                </NavBtn>
            </div>
        </div>
    )
}