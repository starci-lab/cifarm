import React from "react"
import { X } from "lucide-react"
import { ExtendedButton } from "@/components/styled/ExtendedButton"
import { PulsatingActionButton } from "../Hero/PulsatingActionButton"
import { useRouter } from "next/navigation"
import { Logo } from "./Logo"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import { WrappedAnimation } from "@/components"
import { socialLinksConstants } from "@/constants"

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const router = useRouter()

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <WrappedAnimation
                    type="fade-slide"
                    direction="down"
                    duration={0.3}
                    className="fixed inset-0 z-50 flex flex-col bg-primary bg-opacity-98 backdrop-blur-md"
                >
                    <WrappedAnimation
                        type="fade"
                        delay={0.1}
                        className="container mx-auto px-4 py-4 flex items-center justify-between"
                    >
                        <Logo />
                        <ExtendedButton onClick={onClose} className="text-white p-2 focus:outline-none bg-transparent hover:bg-transparent" aria-label="Close menu">
                            <X size={32} />
                        </ExtendedButton>
                    </WrappedAnimation>

                    <WrappedAnimation
                        type="fade-slide"
                        direction="up"
                        delay={0.2}
                        className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center"
                    >
                        <PulsatingActionButton
                            onClick={() => {
                                router.push("/home")
                            }}
                        >
                            Play Now
                        </PulsatingActionButton>
                        <div className="mt-8 max-w-md text-white text-center">
                            <p>
                                CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                            </p>
                        </div>

                        <WrappedAnimation
                            type="fade"
                            delay={0.3}
                            className="flex gap-4 mt-6"
                        >
                            {socialLinksConstants.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className={"rounded-full p-3 text-secondary transition-colors bg-content-2"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </Link>
                            ))}
                        </WrappedAnimation>
                    </WrappedAnimation>
                </WrappedAnimation>
            )}
        </AnimatePresence>
    )
} 