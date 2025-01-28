"use client"

import { Container } from "@/components"
import { useRouterWithSearchParams } from "@/hooks"
import { Link, Spacer } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import React, { FC } from "react"
import { Tokens } from "./Tokens"
import { NFTs } from "./NFTs"
import { AssetTab, useAppSelector } from "@/redux"
import { BottomNavbar } from "./BottomNavbar"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)

    const renderContent = () => {
        const contentMap = {
            [AssetTab.Tokens]: <Tokens />,
            [AssetTab.NFTs]: <NFTs />,
            [AssetTab.InGameItems]: <div>In-Game Items</div>,
        }
        return contentMap[assetTab]
    }

    return (
        <Container hasPadding>
            <div className="h-full">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link as="button" onPress={() => router.back()} color="foreground">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Assets</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
                        Manage your assets.
                    </div>
                    <Spacer y={6} />
                    {renderContent()}
                    <Spacer y={12}/>
                </div>
                <BottomNavbar />
            </div>
        </Container>
    )
}

export default Page
