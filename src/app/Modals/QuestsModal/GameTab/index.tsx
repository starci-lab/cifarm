"use client"
import { List } from "@/components"
import React, { FC } from "react"
import { QuestCard } from "../QuestCard"
import { GOLD_IMAGE_URL } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { DOWNLOAD_PACKAGE_MODAL_DISCLOSURE } from "@/app/constants"
import { useAppDispatch } from "@/redux"
import { setDownloadPackageModal } from "@/redux/slices/modal"
export enum GameTabContent {
    DownloadNFTPackage = "DownloadNFTPackage",
}
export const GameTab: FC = () => {
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(DOWNLOAD_PACKAGE_MODAL_DISCLOSURE)
    const dispatch = useAppDispatch()
    return (
        <div className="relative">
            <List 
                items={Object.values(GameTabContent)}
                contentCallback={(item) => {
                    switch (item) {
                    case GameTabContent.DownloadNFTPackage:
                        return (
                            <QuestCard
                                title="Download NFT Package"
                                description="Download the NFT package to render the NFTs in the game"
                                onClick={() => {
                                    dispatch(setDownloadPackageModal({
                                        packageId: 1,
                                    }))
                                    open()
                                }}
                                rewards={[
                                    {
                                        key: "download-nft-package",
                                        imageUrl: GOLD_IMAGE_URL,
                                        amount: 100,
                                    },
                                ]}
                            />
                        )
                    }
                }}
            />
        </div>
    )
}
