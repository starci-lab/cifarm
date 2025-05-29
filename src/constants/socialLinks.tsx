import { TelegramLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react"
import React from "react"

interface SocialLink {
    name: string
    icon: React.FC
    href: string
    className: string
    label: string
}

export const socialLinksConstants: SocialLink[] = [
    {
        name: "Twitter",
        icon: XLogo,
        href: "https://x.com/CifarmOnSol",
        className: "bg-black hover:bg-gray-800",
        label: "X Link"
    },
    {
        name: "Telegram",
        icon: TelegramLogo,
        href: "https://t.me/cifarm_bot",
        className: "bg-blue-500 hover:opacity-90",
        label: "Telegram Link"
    },
    {
        name: "Youtube",
        icon: YoutubeLogo,
        href: "https://youtu.be/embzVX0z5pk",
        className: "bg-red-600 hover:opacity-90",
        label: "Youtube Link"
    }
] 