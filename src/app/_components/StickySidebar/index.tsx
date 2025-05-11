"use client"
import { useIsMobile } from "@/hooks"
import { UrlItem } from "../../../components/styled/UrlItem"
import { socialLinksConstants } from "../../../constants/socialLinks"
import React from "react"

interface StickySidebarProps {
    className?: string
}

export function StickySidebar({ className = "" }: StickySidebarProps) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return null
    }

    return (
        <div className={`fixed top-56 right-4 w-12 h-fit z-50 ${className}`}>
            <div className="flex flex-col gap-4">
                {socialLinksConstants.map((social) => (
                    <UrlItem
                        key={social.name}
                        href={social.href}
                        label={social.label}
                        isExternal={true}
                        icon={social.icon}
                        className={"rounded-full p-3 text-secondary bg-content-2 hover:bg-content-2/40 transition-colors flex items-center justify-center"}
                    />
                ))}
            </div>
        </div>
    )
} 