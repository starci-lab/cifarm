"use client"

import React, { FC } from "react"
import { Container, Header, Spacer } from "@/components"
import { NFTStarterBoxCard } from "./NFTStarterBoxCard"

const Page: FC = () => {
    return (
        <Container hasPadding>
            <div>
                <Header title="Starter Shop" description="Buying your first goods on CiFarm" />
                <Spacer y={6}/>
                <NFTStarterBoxCard />
            </div>
        </Container>
    )
}

export default Page
