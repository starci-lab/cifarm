import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components"
import { cn } from "@/lib/utils"

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
    ...props
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    const maxVisiblePages = 5
    let visiblePages = pages

    if (totalPages > maxVisiblePages) {
        const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const end = Math.min(totalPages, start + maxVisiblePages - 1)
        visiblePages = pages.slice(start - 1, end)
    }

    return (
        <div className={cn("flex items-center gap-1", className)} {...props}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            {visiblePages.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
