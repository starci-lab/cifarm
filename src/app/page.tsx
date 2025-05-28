"use client"

import React from "react"
import { Header, Footer, StickySidebar, Roadmap, Hero, Intro } from "./_components"
import { Image, Marquee, ScrollProgress, WrappedSection } from "@/components"
import { chainKeyMap } from "@/modules/blockchain"
import { BlurEffect } from "@/components"

const Page = () => {
    return (
        <main className="relative bg-background overflow-x-hidden w-screen">
            <BlurEffect />

            <Header />
            <ScrollProgress />
            <div className="container mx-auto px-4">
                <Hero />
                <Intro />
                <WrappedSection 
                    title="Supported Chains"
                >
                    <Marquee className="w-full"
                        repeat={10}
                    >
                        {
                            chainKeyMap.map((chain) => (
                                <div key={chain.key} className="flex items-center justify-center mr-4 sm:mr-6 md:mr-8 lg:mr-10">
                                    <Image 
                                        src={chain.iconUrl} 
                                        alt={chain.name} 
                                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20" 
                                    />
                                </div>
                            ))
                        }
                    </Marquee>
                </WrappedSection>
                <WrappedSection 
                    title="Roadmap"
                    description="Main goals and objectives"
                >
                    <Roadmap />
                </WrappedSection>
            </div>
            <StickySidebar />
            <Footer />
        </main>
    )
}

export default Page
