import { cn } from "@/lib/utils"
import React, { FC } from "react"

export interface YouTubePlayerProps {
  youtubeUrl: string
  className: string
  title?: string
}

const getEmbedUrl = (url: string): string => {
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
  
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`
    }
  
    // If URL is already an embed URL, return as is
    if (url.includes("youtube.com/embed/")) {
        return url
    }
  
    // If URL is invalid, return empty string
    return ""
}

export const YouTubePlayer: FC<YouTubePlayerProps> = ({
    youtubeUrl,
    className,
    title,
}) => {
    const embedUrl = getEmbedUrl(youtubeUrl)
    
    if (!embedUrl) {
        return <div>Invalid YouTube URL</div>
    }

    return (
        <iframe
            className={cn(className)}
            src={embedUrl}
            title={title}
            allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    )
}
