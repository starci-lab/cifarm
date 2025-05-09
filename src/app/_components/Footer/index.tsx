import React from "react"
import Image from "next/image"
import { Ripple } from "@/components/magicui/ripple"
import { FooterMenu } from "./FooterMenu"
import { SocialLinks } from "./SocialLinks"

const menuItems = {
    token: {
        title: "Token",
        items: [
            {
                label: "CAULI Token",
                href: "#about-farm"
            }
        ]
    },
    aboutGame: {
        title: "About the Game",
        items: [
            {
                label: "Play Now",
                href: "/sign-in"
            },
            {
                label: "How to play",
                href: "/",
                isExternal: true
            }
        ]
    },
    information: {
        title: "Information",
        items: [
            {
                label: "Docs",
                href: "/",
                isExternal: true
            },
            {
                label: "Terms of Use",
                href: "/wp-content/uploads/2024/05/en_cfm_tos_site.pdf",
                isExternal: true
            },
            {
                label: "Privacy Policy",
                href: "/wp-content/uploads/2024/05/en_cfm_privacy_site.pdf",
                isExternal: true
            }
        ]
    }
}

export const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden">
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Footer menus */}
                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                <FooterMenu {...menuItems.token} />
                                <FooterMenu {...menuItems.aboutGame} />
                                <FooterMenu {...menuItems.information} />
                            </div>
                        </div>

                        {/* Footer content column */}
                        <div className="md:col-span-1">
                            <div className="space-y-6">
                                <p className="">
                                    CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                                </p>

                                <SocialLinks />

                                {/* Copyright */}
                                <div className="text-sm">2025 © Cifarm. All Rights Reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="-mt-32 sm:-mt-44 md:-mt-64 lg:-mt-64 xl:-mt-80">
                <Image
                    src="/landing/footer-background.png"
                    alt="Footer background"
                    width={2000}
                    height={2000}
                    className="w-full"
                />
            </div>
            <Ripple />
        </footer>
    )
}