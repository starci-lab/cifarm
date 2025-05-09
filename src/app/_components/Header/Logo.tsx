import React from "react"
import Image from "next/image"
import Link from "next/link"

export function Logo() {
    return (
        <Link href="/" className="flex items-center">
            <Image src="/landing/text-logo.png" alt="Cifarm Logo" width={140} height={30} priority className="h-auto" />
        </Link>
    )
} 