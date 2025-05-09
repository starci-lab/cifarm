import React from "react"
import { Header, Footer, Section, StickySidebar } from "./_components"
import { Roadmap } from "./_components/Roadmap"

export default function LandingPage() {
    return (
        <main className="relative w-full bg-sidebar-foreground">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <Section 
                    title="Welcome to Cifarm"
                    description="Your trusted platform for secure and efficient cryptocurrency management"
                >
                    <div className="h-screen w-full bg-sidebar-foreground" />
                </Section>

                <Section 
                    title="Roadmap"
                    description="Main goals and objectives"
                >
                    <Roadmap />
                </Section>
            </div>

            <StickySidebar />
            <Footer />
        </main>
    )
}
