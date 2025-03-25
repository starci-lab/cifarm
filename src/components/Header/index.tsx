import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import React from "react"
import { useRouterWithSearchParams } from "@/hooks"

export interface HeaderProps {
  title: string
  description: string
}

export const Header = ({ title, description }: HeaderProps) => {
    const router = useRouterWithSearchParams()

    return (
        <div>
            <div className="flex gap-2 items-center">
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant="link"
                            onClick={() => router.back()}
                            className="p-0"
                            aria-label="Go Back"
                        >
                            <ArrowLeftIcon className="w-6 h-6 text-foreground" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    Go Back
                    </TooltipContent>
                </Tooltip>
                <div className="text-2xl font-bold">{title}</div>
            </div>
            <div className="my-4" /> {/* Spacer alternative */}
            <div className="text-xs text-foreground-400">
                {description}
            </div>
        </div>
    )
}