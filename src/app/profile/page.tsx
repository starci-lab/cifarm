"use client"

import { Container } from "@/components"
import { useRouterWithSearchParams } from "@/hooks"
import { Link, Spacer, Tab, Tabs } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import React, { FC } from "react"
import { Tokens } from "./Tokens"
import { AssetTab, setAssetTab, useAppDispatch, useAppSelector } from "@/redux"
import { Profile } from "./Profile"
import { GameAssets } from "./GameAssets"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)

    const renderContent = () => {
        const contentMap = {
            [AssetTab.OnChainAssets]: <Tokens />,
            [AssetTab.Profile]: <Profile />,
            [AssetTab.GameAssets]: <GameAssets />,
        }
        return contentMap[assetTab]
    }
    const dispatch = useAppDispatch()
    return (
        <Container hasPadding>
            <div className="h-full">
                <div>
                    <div className="flex gap-2 items-center">
                        <Link as="button" onPress={() => router.back()} color="foreground">
                            <ArrowLeftIcon className="w-6 h-6" />
                        </Link>
                        <div className="text-2xl font-bold">Profile</div>
                    </div>
                    <Spacer y={4} />
                    <div className="text-xs text-foreground-400">
                        Manage your profile, tokens, NFTs, and in-game items
                    </div>
                    <Spacer y={6} />
                    <Tabs size="lg" color="primary" classNames={{
                        base: "w-full",
                        tabList: "w-full",
                        tabContent: "group-data-[selected=true]:light group-data-[selected=true]:text-background",
                    }} selectedKey={assetTab} onSelectionChange={(assetTab) => dispatch(setAssetTab(assetTab))} aria-label="Options">
                        <Tab key={AssetTab.OnChainAssets} title="On-chain Assets"/>
                        <Tab key={AssetTab.Profile} title="Profile"/>
                        <Tab key={AssetTab.GameAssets} title="Game Assets"/>
                    </Tabs>    
                    <Spacer y={6} />
                    {renderContent()}
                    <Spacer y={12}/>
                </div>
            </div>
        </Container>
    )
}

export default Page
