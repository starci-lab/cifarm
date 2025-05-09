import React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface UrlItemProps {
    href: string
    label: string
    isExternal?: boolean
    className?: string
    icon?: LucideIcon | React.FC<{ size?: number }>
    iconSize?: number
}

export const UrlItem = ({
    href,
    label,
    isExternal = false,
    className = "transition-colors",
    icon: Icon,
    iconSize = 20,
}: UrlItemProps) => {
    const commonProps = {
        className,
        "aria-label": label,
    }

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...commonProps}
            >
                {Icon ? <Icon size={iconSize} /> : label}
            </a>
        )
    }

    return (
        <Link href={href} {...commonProps}>
            {Icon ? <Icon size={iconSize} /> : label}
        </Link>
    )
} 