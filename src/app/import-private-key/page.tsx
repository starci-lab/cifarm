"use client"
import { Container, Header, Spacer, Textarea } from "@/components"
import React, { FC } from "react"

const Page: FC = () => {
    return (
        <Container hasPadding>
            <div className="h-full">
                <Header title="Import from private key" description="Import your account from existing private key." />
                <Spacer y={6} />
                <Textarea placeholder="Enter your private key" />
            </div>
        </Container>
    )
}

export default Page
