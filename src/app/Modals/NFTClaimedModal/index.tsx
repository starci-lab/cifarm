"use client"
import { NFT_CLAIMED_DISCLOSURE, QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { ModalHeader, Image, Spacer, NFTRarityBadge, ExtendedButton } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { NFTType } from "@/modules/entities"
import { NFTRarityEnum } from "@/modules/blockchain"
import { getNFTImageFromNFTType } from "@/app/utils"
import { useGraphQLQueryStaticSwr } from "@/hooks"

export const NFTClaimedModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFT_CLAIMED_DISCLOSURE)
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const nftName = useAppSelector((state) => state.modalReducer.nftClaimedModal.nftName)
    const nftType = useAppSelector((state) => state.modalReducer.nftClaimedModal.nftType)
    const rarity = useAppSelector((state) => state.modalReducer.nftClaimedModal.rarity)
    
    const account = accounts.find((account) => account.id === currentId)
    if (!account) {
        return null
    }
    const _nftType = nftType ?? NFTType.DragonFruit
    const _rarity = rarity ?? NFTRarityEnum.Common
    const _nftName = nftName ?? "Dragon Fruit"

    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="NFT Claimed" />
                    </DialogTitle>
                </DialogHeader> 
                <div>
                    <div className="text-sm text-muted-foreground">
                        Congratulations! You have claimed the following NFT:
                    </div>
                    <Spacer y={4} />
                    <div className="rounded-md p-2 w-fit bg-card">
                        <Image src={
                            (()=>{
                                if (!staticSwr.data) return ""
                                return getNFTImageFromNFTType({
                                    nftType: _nftType,
                                    staticData: staticSwr.data?.data,
                                })
                            })()

                        } className="w-32 h-32 object-contain" />
                    </div>
                    <Spacer y={4} />
                    <div className="flex items-center gap-2">
                        <div className="text-sm">{_nftName}</div>
                        <NFTRarityBadge rarity={_rarity} />
                    </div>
                    <Spacer y={6} />
                    <ExtendedButton
                        size="lg"
                        className="w-full"
                        onClick={() => {
                            close()
                        }}
                    >
                        Close
                    </ExtendedButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
