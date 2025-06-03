import { ArrowRight } from "@phosphor-icons/react"
import React from "react"

interface AnnouncementBannerProps {
    text: string
    link: string
}

export const AnnouncementBanner = ({ text, link }: AnnouncementBannerProps) => {
    return (
        <a className="flex items-center space-x-2 bg-content-2 w-fit px-3 py-1.5 rounded-full" href={link} target="_blank" rel="noreferrer">
            <span className="text-secondary text-sm font-semibold">{text}</span>
            <ArrowRight className="h-4 w-4 text-secondary" />
        </a>
    )
} 