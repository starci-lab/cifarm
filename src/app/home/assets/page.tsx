"use client"
import { Header, Spacer } from "@/components"
import React from "react"
import { ChainSelectionDropdown } from "./ChainSelectionDropdown"
import { AppTabs } from "@/components"
import { useAppSelector, useAppDispatch, AssetTab, setAssetTab } from "@/redux"
import { TokensTab } from "./TokensTab"
import { NFTCollectionsTab } from "./NFTCollectionsTab"

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
            return <TokensTab />
        }
    }
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <Header title="Assets" />
                <ChainSelectionDropdown />
            </div>
            <Spacer y={6} />
            <div>
                <div className="flex justify-between items-center gap-4">
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
                </div>
            </div>
            <Spacer y={4} />
            {renderContent()}
        </div>
    )
}

export default Page
