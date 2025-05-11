"use client"
import { Header, Spacer, Card, CardContent, ExtendedButton } from "@/components"
import React from "react"
import { ChainSelectionDropdown } from "./ChainSelectionDropdown"
import { AppTabs } from "@/components"
import { useAppSelector, useAppDispatch, AssetTab, setAssetTab } from "@/redux"
import { TokensTab } from "./TokensTab"
import { NFTCollectionsTab } from "./NFTCollectionsTab"
import { InGameTab } from "./InGameTab"
import { Button } from "../../../components/ui/button"

const Page = () => {
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)
    const dispatch = useAppDispatch()

    const renderContent = () => {
        switch (assetTab) {
        case AssetTab.Tokens:
            return <TokensTab />
        case AssetTab.NFTs:
            return <NFTCollectionsTab />
        case AssetTab.InGame:
            return <InGameTab />
        }
    }
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Header title="Assets" />
                <ChainSelectionDropdown />
            </div>
            <Spacer y={6} />
            <ExtendedButton variant={"default"}>
                Hello
            </ExtendedButton>
            <ExtendedButton variant={"secondary"}>
                Hello
            </ExtendedButton>
            <ExtendedButton variant={"gradient"}>
                Hello
            </ExtendedButton>
            <Button variant={"gradient"} >
                Hello Gradient
            </Button>
            <Card className="rounded-lg" variant="secondary">
                <CardContent>
                    <AppTabs
                        tabs={[{
                            label: "Tokens",
                            value: AssetTab.Tokens,
                        }, {
                            label: "NFTs",
                            value: AssetTab.NFTs, 
                        }, {
                            label: "In-Game",
                            value: AssetTab.InGame,
                        }]}
                        selectedTab={assetTab}
                        onSelectTab={(tab) => dispatch(setAssetTab(tab as AssetTab))}
                    />
                    <Spacer y={4} />
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    )
}

export default Page
