"use client"
import { BlurEffect, ExtendedButton, FilterBar, Header, Spacer } from "@/components"
import React, { useEffect } from "react"
import { AppTabs } from "@/components"
import {
    useAppSelector,
    useAppDispatch,
    AssetTab,
    setAssetTab,
    SidebarTab,
    triggerRefreshTokens,
    triggerRefreshNFTCollections,
} from "@/redux"
import { TokensTab } from "./TokensTab"
import { NFTCollectionsTab } from "./NFTCollectionsTab"
import { InGameTab } from "./InGameTab"
import { useRouterWithSearchParams } from "@/hooks"
import { useSearchParams } from "next/navigation"
import { ArrowsClockwise } from "@phosphor-icons/react"

const Page = () => {
    const assetTab = useAppSelector((state) => state.tabReducer.assetTab)
    const dispatch = useAppDispatch()

    const selectedAssetTab = useAppSelector((state) => state.tabReducer.assetTab)
    const selectedSidebarTab = useAppSelector(
        (state) => state.sidebarReducer.tab
    )
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
                    tab: selectedAssetTab,
                },
            })
        }
    }, [selectedAssetTab])

    // when selectedSidebarTab change
    useEffect(() => {
        if (selectedSidebarTab === SidebarTab.Assets) {
            router.push("", {
                params: {
                    tab: selectedAssetTab,
                },
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

    const renderRightContent = () => {
        switch (assetTab) {
        case AssetTab.Tokens:
            return <div className="flex gap-2 justify-between items-center">
                <FilterBar
                    onSearchStringChange={() => {}}
                    searchString={""}
                    className="max-w-[200px]"
                />
                <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => dispatch(triggerRefreshTokens())}>
                    <ArrowsClockwise />
                </ExtendedButton>
            </div>
        case AssetTab.NFTs:
            return <div className="flex gap-2 justify-between items-center">
                <FilterBar
                    onSearchStringChange={() => {}}
                    searchString={""}
                    className="max-w-[200px]"
                />
                <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => dispatch(triggerRefreshNFTCollections())}>
                    <ArrowsClockwise />
                </ExtendedButton>
            </div>
        case AssetTab.InGame:
            return <></>
        }
    }
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" />
            <div className="flex justify-between items-center gap-4">
                <Header title="Assets" />
            </div>
            <Spacer y={6} />
            <div className="flex gap-2 justify-between items-center">
                <AppTabs
                    tabs={[
                        {
                            label: "Tokens",
                            value: AssetTab.Tokens,
                        },
                        {
                            label: "NFTs",
                            value: AssetTab.NFTs,
                        },
                        {
                            label: "In-Game",
                            value: AssetTab.InGame,
                        },
                    ]}
                    color="secondary"
                    selectedTab={assetTab}
                    onSelectTab={(tab) => dispatch(setAssetTab(tab as AssetTab))}
                />
                {renderRightContent()}
            </div>
            <Spacer y={6} />
            {renderContent()}
        </div>
    )
}

export default Page
