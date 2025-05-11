"use client"

import React from "react"
import { Header, Footer, StickySidebar, Roadmap, Hero, Intro } from "./_components"
import { ScrollProgress, WrappedSection } from "@/components"

const Page = () => {
    return (
        <main className="relative w-full bg-background">
            <Header />
            <ScrollProgress />
            <div className="container mx-auto px-4">
                <Hero />
                <Intro />
                <WrappedSection 
                    title="Roadmap"
                    description="Main goals and objectives"
                >
                    <Roadmap />
                    <Intro />
                </WrappedSection>
            </div>
            <StickySidebar />
            <Footer />
        </main>
    )
}

export default Page
