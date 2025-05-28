"use client"

import { Avatar, AvatarImage } from "../../ui"
import React, { FC, useState, useEffect } from "react"
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
    const [ avatarUrl, setAvatarUrl ] = useState("")
    useEffect(() => {
        // if both imgSrc and jazzString are not provided, return
        if (!imgSrc && !jazzString) {
            return 
        }
        // if imgSrc is provided, set the avatarUrl to imgSrc
        if (imgSrc) {
            setAvatarUrl(imgSrc)
        } else {
            if (!jazzString) {
                throw new Error("Either imgSrc or jazzString must be provided")
            }
            setAvatarUrl(createJazziconBlobUrl(jazzString))
        }
    }, [imgSrc, jazzString])
    
    return (
        <div className="relative">
            <Avatar className={
                cn(
                    "w-16 h-16 min-w-16 min-h-16 ring ring-2 ring-ring",
                    "bg-foreground",
                    "rounded-sm",
                    classNames.avatar
                )}
            >
                <AvatarImage src={avatarUrl} alt="Profile" className={
                    cn(
                        "w-16 h-16 min-w-16 min-h-16",
                        classNames.avatarImage
                    )}/>
            </Avatar>
        </div>
    )
}   


