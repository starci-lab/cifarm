"use client"

import React from "react"
import { Header, Footer, StickySidebar, Roadmap, Hero, Intro } from "./_components"
import { ScrollProgress, WrappedSection } from "@/components"
import { Teams } from "./_components/Teams"

const Page = () => {
    return (
        <main className="relative w-full bg-background">
            <Header />
            <ScrollProgress />
            <div className="container mx-auto px-4">
                <Hero />
                <Intro />
                <WrappedSection 
                    title="Our teams"
                >
                    <Teams />
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
