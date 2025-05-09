import { ArrowRight } from "lucide-react"
import React from "react"

interface AnnouncementBannerProps {
    text: string
}

export const AnnouncementBanner = ({ text }: AnnouncementBannerProps) => (
    <div className="flex items-center space-x-2 bg-primary-2/10 w-fit px-3 py-1.5 rounded-full border border-primary-2/20">
        <span className="text-primary-2 text-sm font-medium">{text}</span>
        <ArrowRight className="h-4 w-4 text-primary-2" />
    </div>
) 