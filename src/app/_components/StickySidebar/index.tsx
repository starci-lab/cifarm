"use client"
import React from "react"
import { useIsMobile } from "@/hooks"
import Link from "next/link"
import { SOCIAL_LINKS } from "./constants"

interface StickySidebarProps {
    className?: string
}

export function StickySidebar({ className = "" }: StickySidebarProps) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return null
    }

    return (
        <div className={`fixed top-56 right-4 w-12 h-fit ${className}`}>
            <div className="flex flex-col gap-4">
                {SOCIAL_LINKS.map((social) => (
                    <Link
                        key={social.name}
                        href={social.href || "#"}
                        className={`${social.className} rounded-full p-3 text-white transition-colors`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <social.icon size={20} />
                    </Link>
                ))}
            </div>
        </div>
    )
} 