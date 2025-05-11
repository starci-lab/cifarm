import React from "react"

interface HighlightBannerProps {
    text: string
    icon?: React.ReactNode
}

export const HighlightBanner = ({ text, icon }: HighlightBannerProps) => (
    <div className="flex text-text-highlight items-center space-x-2 bg-primary-2/10 w-fit px-3 py-1.5 rounded-full border border-primary-2/20">
        <div>
            {text}
        </div>
        {icon}
    </div>
) 