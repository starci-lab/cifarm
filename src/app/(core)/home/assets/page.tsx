"use client"
import { BlurEffect, ExtendedButton, FilterBar, Header, Spacer } from "@/components"
import React, { useEffect, useRef } from "react"
import { AppTabs } from "@/components"
import {
    useAppSelector,
    useAppDispatch,
    AssetTab,
    setAssetTab,
    SidebarTab,
    setWalletConnectionRequiredModal,
} from "@/redux"
import { TokensTab } from "./TokensTab"
import { NFTCollectionsTab } from "./NFTCollectionsTab"
import { InGameTab } from "./InGameTab"
import { useRouterWithSearchParams } from "@/hooks"
import { useSearchParams } from "next/navigation"
import { ArrowsClockwise } from "@phosphor-icons/react"
import { ChainKey } from "@/modules/blockchain"
import { useCurrentWallet } from "@mysten/dapp-kit"
import { useDisclosure } from "react-use-disclosure"
import { useSingletonHook } from "@/singleton"
import { CONNECT_DISCLOSURE, WALLET_CONNECTION_REQUIRED_DISCLOSURE } from "@/singleton"
import { RPCLimitationWarning } from "./RPCLimitationWarning"

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

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    // when selectedAssetTab change
    const { address } = useAppSelector(state => state.walletReducer[ChainKey.Solana])

    const { currentWallet } = useCurrentWallet()
    const { open: openConnectModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(CONNECT_DISCLOSURE)
    const { open: openWalletConnectionRequiredModal, close: closeWalletConnectionRequiredModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(WALLET_CONNECTION_REQUIRED_DISCLOSURE)
    const balanceSwrs = useAppSelector((state) => state.sessionReducer.balanceSwrs)
    const lastTabRef = useRef<AssetTab>(selectedAssetTab)
    useEffect(() => {
        if (lastTabRef.current === selectedAssetTab) {
            return
        }
        lastTabRef.current = selectedAssetTab
        switch (selectedAssetTab) {
        case AssetTab.Tokens: {
            switch (chainKey) {
            case ChainKey.Sui: {
                if (!currentWallet) {
                    // warning that no wallet is connected
                    dispatch(setWalletConnectionRequiredModal({
                        chainKey: ChainKey.Sui,
                    }))
                    openWalletConnectionRequiredModal()
                }
                break
            }
            case ChainKey.Solana: {
                if (!address) {
                    // warning that no wallet is connected
                    dispatch(setWalletConnectionRequiredModal({
                        chainKey: ChainKey.Solana,
                    }))
                    openWalletConnectionRequiredModal()
                }
            }
                break
            }
            break
        }
        case AssetTab.NFTs: {
            // check if solana is connected
            if (!address) {
                dispatch(setWalletConnectionRequiredModal({
                    chainKey: ChainKey.Solana,
                }))
                openWalletConnectionRequiredModal()
            }
            break
        }
        case AssetTab.InGame: {
            break
        }
        }
    }, [chainKey, currentWallet, address, openConnectModal, openWalletConnectionRequiredModal, closeWalletConnectionRequiredModal, selectedAssetTab])

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
            return <div className="flex gap-2 justify-between items-center w-full md:w-auto">
                {/* <ChainSelectButton /> */}
                <FilterBar
                    onSearchStringChange={() => { }}
                    searchString={""}
                    className="w-full md:max-w-[200px]"
                />
                <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => {
                    // blockchainBalances.mutate()
                    for (const tokenKey in balanceSwrs) {
                        balanceSwrs[tokenKey].mutate()
                    }
                }}>
                    <ArrowsClockwise />
                </ExtendedButton>
            </div>
        case AssetTab.NFTs:
            return <div className="flex gap-2 justify-between items-center w-full md:w-auto">
                <FilterBar
                    onSearchStringChange={() => { }}
                    searchString={""}
                    className="w-full md:max-w-[200px]"
                />
                <ExtendedButton color="secondary" size="icon" variant="flat" onClick={() => {
                    // blockchainCollections.mutate()
                }}>
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
            <RPCLimitationWarning />
            <Spacer y={6} />
            <div className="flex gap-4 md:gap-2 flex-col md:flex-row md:justify-between items-center">
                <AppTabs
                    classNames={
                        {
                            base: "w-full md:w-auto",
                            list: "w-full md:w-auto",
                        }
                    }
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
            <Spacer y={4} />
            {renderContent()}
        </div>
    )
}

export default Page
