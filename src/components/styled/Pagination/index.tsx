import React, { FC } from "react"
import { Button } from "@/components"
import { cn } from "@/utils"
import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react"

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    color?: "primary" | "secondary"
    maxVisiblePages?: number
    movePageWhenClickThreeDots?: number
}

export const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className,
    color = "primary",
    maxVisiblePages = 1,
    movePageWhenClickThreeDots = 3,
    ...props
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    let visiblePages = pages

    if (totalPages > maxVisiblePages) {
        const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const end = Math.min(totalPages, start + maxVisiblePages - 1)
        visiblePages = pages.slice(start - 1, end)
    }

    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages

    return (
        <div className={cn("flex items-center gap-1", className)} {...props}>
            <Button
                variant="flat"
                size="icon"
                color={color}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
            >
                <CaretLeft className="w-4 h-4 min-w-4 min-h-4"/>
            </Button>
            <>
                {!isFirstPage && (
                    <Button
                        color={color}
                        size="icon"
                        variant="flat"
                        onClick={() => onPageChange(Math.max(1, currentPage - movePageWhenClickThreeDots))}
                    >
                        <DotsThree/>
                    </Button>
                )}
                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        color={color}
                        size="icon"
                        variant={currentPage === page ? "solid" : "flat"}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                ))}
                {!isLastPage && (
                    <Button
                        color={color}
                        size="icon"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + movePageWhenClickThreeDots))}
                        variant="flat"
                    >
                        <DotsThree/>
                    </Button>
                )}
            </>   
            <Button
                variant="flat"
                size="icon"
                color={color}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
            >
                <CaretRight className="w-4 h-4 min-w-4 min-h-4"/>
            </Button>
        </div>
    )
}