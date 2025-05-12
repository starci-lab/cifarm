import React from "react"
import Image from "next/image"
import { BlurEffect, UrlItem } from "@/components"
import { FooterMenu } from "./FooterMenu"
import { footerConstants, socialLinksConstants } from "@/constants"

export const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden">
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Footer menus */}
                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                <FooterMenu {...footerConstants.token} />
                                <FooterMenu {...footerConstants.aboutGame} />
                                <FooterMenu {...footerConstants.information} />
                            </div>
                        </div>

                        {/* Footer content column */}
                        <div className="md:col-span-1">
                            <div className="space-y-6">
                                <p className="text-text-default">
                                    CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                                </p>

                                <div className="flex space-x-4">
                                    {socialLinksConstants.map((link, index) => (
                                        <UrlItem
                                            key={index}
                                            href={link.href}
                                            label={link.label}
                                            isExternal={true}
                                            icon={link.icon}
                                            className="transition-colors text-muted-foreground"
                                        />
                                    ))}
                                </div>

                                {/* Copyright */}
                                <div className="text-sm text-muted-foreground">2025 © Cifarm. All Rights Reserved.</div>
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
            <BlurEffect variant="secondary" size="lg" position="center" />
        </footer>
    )
}