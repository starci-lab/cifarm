"use client"
import { BlurEffect, Header, Spacer } from "@/components"
import React, { useEffect } from "react"
import { AppTabs } from "@/components"
import { useAppSelector, useAppDispatch, AssetTab, setAssetTab, SidebarTab } from "@/redux"
import { TokensTab } from "./TokensTab"
import { NFTCollectionsTab } from "./NFTCollectionsTab"
import { InGameTab } from "./InGameTab"
import { useRouterWithSearchParams } from "@/hooks"
import { useSearchParams } from "next/navigation"

const Page = () => {
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)
    const dispatch = useAppDispatch()

    const selectedAssetTab = useAppSelector(state => state.tabReducer.assetTab)
    const selectedSidebarTab = useAppSelector(state => state.sidebarReducer.tab)
    const router = useRouterWithSearchParams()
    const searchParams = useSearchParams()
    
    //when mount
    useEffect(() => {
        const tab = searchParams.get("tab")
        if (tab) {
            dispatch(setAssetTab(tab as AssetTab))
        }
    }, [])
    // when selectedAssetTab change
    useEffect(() => {
        if (selectedAssetTab) {
            router.push("", {
                params: {
                    tab: selectedAssetTab
                }
            })
        }
    }, [selectedAssetTab])
    
    // when selectedSidebarTab change
    useEffect(() => {
        if (selectedSidebarTab === SidebarTab.Assets) {
            router.push("", {
                params: {
                    tab: selectedAssetTab
                }
            })
        }
    }, [selectedSidebarTab])
    

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
        <div className="relative">
            <BlurEffect variant="secondary" size="lg" position="top" />
            <div className="flex justify-between items-center gap-4">
                <Header title="Assets" />
            </div>
            <Spacer y={6} />
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
        </div>
    )
}

export default Page
