import React from "react"
import { useRouterWithSearchParams } from "@/hooks"
import { Button, Skeleton } from "@/components"
import { ArrowLeft } from "@phosphor-icons/react"
export interface HeaderProps {
  title?: string
  isSkeleton?: boolean
  showBackButton?: boolean
}

export const Header = ({ title, showBackButton, isSkeleton = false }: HeaderProps) => {
    const router = useRouterWithSearchParams()
    return (
        <div className="flex items-center gap-4 text-muted-foreground">
            {showBackButton && (
                <Button size="icon" variant="ghost" color="default" className="text-muted-foreground" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
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