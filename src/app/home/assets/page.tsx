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
    triggerRefreshTokens,
    triggerRefreshNFTCollections,
    setNotificationModal,
    setSelectedChainKey,
} from "@/redux"
import { TokensTab } from "./TokensTab"
import { NFTCollectionsTab } from "./NFTCollectionsTab"
import { InGameTab } from "./InGameTab"
import { useRouterWithSearchParams } from "@/hooks"
import { useSearchParams } from "next/navigation"
import { ArrowsClockwise } from "@phosphor-icons/react"
import { ChainSelectButton } from "./ChainSelectButton"
import { ChainKey } from "@/modules/blockchain"
import { useWallet } from "@solana/wallet-adapter-react"
import { useCurrentWallet } from "@mysten/dapp-kit"
import { useDisclosure } from "react-use-disclosure"
import { useSingletonHook } from "@/modules/singleton-hook"
import { NOTIFICATION_DISCLOSURE, CONNECT_DISCLOSURE } from "@/app/constants"

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
    const { publicKey } = useWallet()

    const { currentWallet } = useCurrentWallet()
    const { open: openConnectModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(CONNECT_DISCLOSURE)
    const { open: openNotificationModal, close: closeNotificationModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(NOTIFICATION_DISCLOSURE)
    
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
                    dispatch(setNotificationModal({
                        title: "No Sui Wallet Connected",
                        message: "Please connect a Sui wallet to continue",
                        buttonText: "Connect",
                        callback: () => {
                            closeNotificationModal()
                            dispatch(setSelectedChainKey(ChainKey.Sui))
                            openConnectModal()
                        },
                    }))
                    openNotificationModal()
                } else {
                    closeNotificationModal()
                }
                break
            }
            case ChainKey.Solana: {
                if (!publicKey) {
                // warning that no wallet is connected
                    dispatch(setNotificationModal({
                        title: "No Solana Wallet Connected",
                        message: "Please connect a Solana wallet to continue",
                        buttonText: "Connect",
                        callback: () => {
                            closeNotificationModal()
                            dispatch(setSelectedChainKey(ChainKey.Solana))
                            openConnectModal()
                        },
                    }))
                    openNotificationModal()
                } else {
                    closeNotificationModal()
                }
            }
                break
            }   
            break
        }
        case AssetTab.NFTs: {
            // check if solana is connected
            if (!publicKey) {
                dispatch(setNotificationModal({
                    title: "No Solana Wallet Connected",
                    message: "Please connect a Solana wallet to continue",
                    buttonText: "Connect",
                    callback: () => {
                        closeNotificationModal()
                        dispatch(setSelectedChainKey(ChainKey.Solana))
                        openConnectModal()
                    },
                }))
                openNotificationModal() 
            } else {
                closeNotificationModal()
            }
            break
        }
        case AssetTab.InGame: {
            break
        }
        }
    }, [chainKey, currentWallet, publicKey, openConnectModal, openNotificationModal, closeNotificationModal, selectedAssetTab])

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
                <ChainSelectButton />
                <FilterBar
                    onSearchStringChange={() => { }}
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
                    onSearchStringChange={() => { }}
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
