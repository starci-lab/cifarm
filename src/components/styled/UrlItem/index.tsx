import React from "react"
import Link from "next/link"

interface UrlItemProps {
    href: string
    label: string
    isExternal?: boolean
    className?: string
    icon?:  React.FC
    iconSize?: number
}

export const UrlItem = ({
    href,
    label,
    isExternal = false,
    className = "transition-colors",
    icon: Icon,
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
                {Icon ? <Icon /> : label}
            </a>
        )
    }

    return (
        <Link href={href} {...commonProps}>
            {Icon ? <Icon /> : label}
        </Link>
    )
} 