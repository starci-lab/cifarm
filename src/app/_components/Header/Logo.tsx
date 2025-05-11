import React from "react"
import { Image, Link } from "@/components"

export const Logo = () => {
    return (
        <Link href="/">
            <Image src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/logo.png" alt="Cifarm Logo" className="h-auto w-10 h-10 rounded-full" />
        </Link>
    )
} 