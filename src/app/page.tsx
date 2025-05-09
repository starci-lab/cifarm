"use client"

import React from "react"
import { Header, Footer, StickySidebar, Roadmap, Hero } from "./_components"
import { ScrollProgress, WrappedSection } from "@/components"

export default function LandingPage() {
    return (
        <main className="relative w-full bg-primary">
            <Header />
            <ScrollProgress />
            <div className="container mx-auto px-4">
                <Hero />
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
