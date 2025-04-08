import { BadgeProps, Badge } from "@/components"
import React, { FC } from "react"

interface ExtendedBadgeProps extends BadgeProps {
    icon?: React.ReactNode
}

export const ExtendedBadge: FC<ExtendedBadgeProps> = ({
    children,
    icon,
    ...props
}: ExtendedBadgeProps) => {
    return (
        <Badge {...props}>
            <div className="flex items-center gap-2">
                {icon}
                <div className="text-sm">{children}</div>
            </div>
        </Badge>
    )
}
