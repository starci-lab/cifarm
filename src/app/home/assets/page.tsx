"use client"
import { Header, Spacer, Card, CardContent } from "@/components"
import React from "react"
import { ChainSelectionDropdown } from "./ChainSelectionDropdown"
import { AppTabs } from "@/components"
import { useAppSelector, useAppDispatch, AssetTab, setAssetTab } from "@/redux"
import { TokensTab } from "./TokensTab"
import { NFTCollectionsTab } from "./NFTCollectionsTab"
import { InGameTab } from "./InGameTab"
import { Button } from "../../../components/ui/button"
import BalanceCard from "./BalanceCard"

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BalanceCard address="0xb859•••8bf292" balance={0} imageUrl="" />

                <div className="md:col-span-2">
                    <Card className="p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Allocations</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-1 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <div className="font-medium text-gray-900">Wallet Holding</div>
                                        <div className="text-gray-600">$0.00</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-1 bg-purple-500 rounded-full"></div>
                                    <div>
                                        <div className="font-medium text-gray-900">RON Staking</div>
                                        <div className="text-gray-600">$0.00</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="text-sm">
                            Stake
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-1 bg-green-500 rounded-full"></div>
                                    <div>
                                        <div className="font-medium text-gray-900">AXS Staking</div>
                                        <div className="text-gray-600">$0.00</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="text-sm">
                            Stake
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Spacer y={6} />
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
