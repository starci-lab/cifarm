import { Button, Spacer } from "@/components"
import React from "react"
import { useRouterWithSearchParams } from "@/hooks"
import { ArrowLeftIcon } from "lucide-react"

export interface HeaderProps {
  title: string
  description: string
}

export const Header = ({ title, description }: HeaderProps) => {
    const router = useRouterWithSearchParams()
    return (
        <div>
            <div className="flex gap-2 items-center">
                <Button
                    variant="ghost-secondary"
                    onClick={() => router.back()}
                    size="icon"
                    aria-label="Go Back"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-foreground" />
                </Button>
                <div className="text-2xl font-bold">{title}</div>
            </div>
            <Spacer y={4} />
            <div className="text-xs text-foreground-400">
                {description}
            </div>
        </div>
    )
}