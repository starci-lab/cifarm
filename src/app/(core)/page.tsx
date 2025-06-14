"use client"

import React from "react"
import { Header, Footer, StickySidebar, Roadmap, Hero, Intro, Announcement } from "./_components"
import { ScrollProgress, WrappedSection } from "@/components"
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
                <Announcement />
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
