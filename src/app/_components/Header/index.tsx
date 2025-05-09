"use client"
import React from "react"
import { ExtendedButton } from "@/components/styled/ExtendedButton"
import { useIsMobile } from "@/hooks"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Logo } from "./Logo"
import { MobileMenu } from "./MobileMenu"
import { PulsatingActionButton } from "../Hero/PulsatingActionButton"
import { useRouter } from "next/navigation"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isMobile = useIsMobile()
    const router = useRouter()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="w-full overflow-hidden sticky top-0 z-50">
            {/* Blurred background */}
            <div className="absolute inset-0 bg-opacity-95 backdrop-blur-sm z-0"></div>

            <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
                <Logo />

                {/* Desktop Navigation */}
                {!isMobile && <div className="flex items-center gap-4">
                    <PulsatingActionButton
                        onClick={() => {
                            router.push("/home")
                        }}
                    >
                        Play Now
                    </PulsatingActionButton>
                </div>}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <ExtendedButton
                        onClick={toggleMenu}
                        className="text-white p-2 focus:outline-none bg-transparent hover:bg-transparent"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <Menu size={32} />
                    </ExtendedButton>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </header>
    )
}
