import React from "react"
import { Twitter, DiscIcon as Discord, MessageCircle, Youtube } from "lucide-react"

interface SocialLink {
    icon: React.ReactNode
    href: string
    label: string
}

const socialLinks: SocialLink[] = [
    {
        icon: <Twitter className="w-6 h-6" />,
        href: "/",
        label: "X Link"
    },
    {
        icon: <Discord className="w-6 h-6" />,
        href: "/",
        label: "Discord Link"
    },
    {
        icon: <MessageCircle className="w-6 h-6" />,
        href: "/",
        label: "Telegram Link"
    },
    {
        icon: <Youtube className="w-6 h-6" />,
        href: "/",
        label: "Youtube Link"
    }
]

export const SocialLinks = () => {
    return (
        <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    aria-label={link.label}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    )
} 