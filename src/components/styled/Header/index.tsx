import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import React from "react"
import { IconWrapper } from "../IconWrapper"
import { useRouterWithSearchParams } from "@/hooks"
import { Skeleton } from "@/components"
export interface HeaderProps {
  title?: string
  isSkeleton?: boolean
  showBackButton?: boolean
}

export const Header = ({ title, showBackButton, isSkeleton = false }: HeaderProps) => {
    const router = useRouterWithSearchParams()
    return (
        <div className="flex items-center gap-4 text-text-default">
            {showBackButton && (
                <IconWrapper classNames={{ base: "text-muted-foreground" }}>
                    <ArrowLeftIcon className="w-5 h-5" onClick={() => router.back()} />
                </IconWrapper>
            )}
            {
                isSkeleton ? (
                    <Skeleton className="w-[160px] h-12"/>
                ) : (
                    <div className="text-4xl">{title}</div>
                )
            }
        </div>
    )
}