import { Avatar, AvatarImage } from "../../ui"
import React, { FC } from "react"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { cn } from "@/lib/utils"

interface GameAvatarProps {
    // use img src if available
    imgSrc?: string
    // use jazz string if img src is not available
    jazzString?: string
    classNames?: {
        avatar?: string
        avatarImage?: string
    }
}

export const GameAvatar: FC<GameAvatarProps> = ({ imgSrc, jazzString, classNames = {} }) => {
    let avatarUrl = ""
    if (imgSrc) {
        avatarUrl = imgSrc
    } else {
        if (!jazzString) {
            throw new Error("Either imgSrc or jazzString must be provided")
        }
        avatarUrl = createJazziconBlobUrl(jazzString)
    }
    return (
        <div className="relative">
            <Avatar className={
                cn(
                    "w-20 h-20 min-w-20 min-h-20 ring ring-2 ring-background/50",
                    "bg-foreground",
                    classNames.avatar
                )}
            >
                <AvatarImage src={avatarUrl} alt="Profile" className={
                    cn(
                        "w-20 h-20 min-w-20 min-h-20",
                        classNames.avatarImage
                    )}/>
            </Avatar>
        </div>
    )
}   


