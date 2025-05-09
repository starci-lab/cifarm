import React from "react"
import Link from "next/link"

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
            <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        {item.isExternal ? (
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link href={item.href} className="transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
} 