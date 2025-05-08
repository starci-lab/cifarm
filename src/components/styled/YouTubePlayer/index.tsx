import { cn } from "@/lib/utils"
import React, { FC } from "react"

export interface YouTubePlayerProps {
  youtubeUrl: string;
  className: string;
  title?: string;
}

export const YouTubePlayer: FC<YouTubePlayerProps> = ({
    youtubeUrl,
    className,
    title,
}) => {
    return (
        <iframe
            className={cn(className)}
            src={youtubeUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    )
}
