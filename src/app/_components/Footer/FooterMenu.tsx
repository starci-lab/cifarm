import React from "react"
import { UrlItem } from "../../../components/styled/UrlItem"

interface FooterMenuProps {
    title: string
    items: {
        label: string
        href: string
        isExternal?: boolean
    }[]
}

export const FooterMenu = ({ title, items }: FooterMenuProps) => {
    return (
        <div>
            <h3 className="text-xl font-bold mb-4 text-muted-foreground">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <UrlItem
                            href={item.href}
                            label={item.label}
                            isExternal={item.isExternal}
                            className="text-text-default"
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
} 