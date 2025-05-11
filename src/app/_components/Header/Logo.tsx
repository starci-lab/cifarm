import React from "react"
import { Image, Link } from "@/components"

interface LogoProps {
    withText?: boolean
}

export const Logo = ({
    withText = true,
}: LogoProps) => {
    return (
        <Link href="/" classNames={{ base: "flex items-center gap-2" }}>
            <Image src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/logo.png" alt="Cifarm Logo" className="h-auto w-10 h-10 rounded-full" />
            {withText && <p className="text-muted-foreground text-2xl">CiFarm</p>}
        </Link>
    )
} 