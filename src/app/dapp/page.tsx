"use client"
import { Container, Header, Spacer } from "@/components"
import React, { FC } from "react"
import { DAppCard } from "./DAppCard"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
const Page: FC = () => {
    const router = useRouterWithSearchParams()
    return (
        <Container hasPadding>
            <div>
                <Header title="DApps" description="Discover and explore the best DApps on CiFarm" />
                <Spacer y={6}/>
                <div className="flex flex-col gap-4">
                    <DAppCard 
                        title="Starter Shop"
                        description="Buy and sell NFTs"
                        image="/images/dapp/starter-shop.png"
                        onClick={() => router.push(pathConstants.dappStarterShop)}
                    />
                    <DAppCard 
                        title="Wholesale Market"
                        description="Buy and sell NFTs"
                        image="/images/dapp/wholesale-market.png"
                        onClick={() => router.push(pathConstants.dappWholesaleMarket)}
                    />
                </div>
            </div>
        </Container>
    )
}

export default Page
