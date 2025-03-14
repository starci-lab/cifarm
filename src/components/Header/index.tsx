import { useRouterWithSearchParams } from "@/hooks"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Link, Spacer } from "@heroui/react"
import React from "react"

export interface HeaderProps {
    title: string
    description: string
}

export const Header = ({ title, description }: HeaderProps) => {
    const router = useRouterWithSearchParams()
    return (
        <div>
            <div className="flex gap-2 items-center">
                <Link as="button" onPress={() => router.back()} color="foreground">
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
                <div className="text-2xl font-bold">{title}</div>
            </div>
            <Spacer y={4} />
            <div className="text-xs text-foreground-400">
                {description}
            </div>
        </div>
    )
}

