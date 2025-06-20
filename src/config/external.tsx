import { Book, XLogo } from "@phosphor-icons/react"
import React from "react"
export const externalNavItems = [
    {
        key: "docs",
        name: "Docs",
        icon: <Book size={32} />,
        action: () => { window.open("https://docs.cifarm.xyz/", "_blank") },
    },
    {
        key: "x",
        name: "X",
        icon: <XLogo size={32} />,
        action: () => { window.open("https://x.com/CifarmOnSol", "_blank") },
    },
]