"use client"

import React, { FC } from "react"
import { AssetTab, setAssetTab, useAppDispatch, useAppSelector } from "@/redux"
import { Container, Header, Spacer, Tabs, TabsList, TabsTrigger } from "@/components"  // ShadCN UI Button
import { OnChainAssets } from "./OnChainAssets"

const Page: FC = () => {
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)

    const renderContent = () => {
        const contentMap = {
            [AssetTab.OnChainAssets]: <OnChainAssets />,
            [AssetTab.Profile]: <div />,
            [AssetTab.GameAssets]: <div />,
        }
        return contentMap[assetTab]
    }

    const dispatch = useAppDispatch()

    return (
        <Container hasPadding> 
            <div>
                <Header 
                    title="Profile"
                    description="Manage your profile, tokens, NFTs, and in-game items"
                />
                <Spacer y={6}/>
                <div>
                    <Tabs className="w-full" value={assetTab} onValueChange={(value) => dispatch(setAssetTab(value as AssetTab))}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value={AssetTab.OnChainAssets}>
                                On-chain Assets
                            </TabsTrigger>
                            <TabsTrigger value={AssetTab.Profile}>
                                Profile
                            </TabsTrigger>
                            <TabsTrigger value={AssetTab.GameAssets}>
                                Game Assets
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <Spacer y={6}/>
                {renderContent()}
            </div>
        </Container>
    )
}

export default Page
