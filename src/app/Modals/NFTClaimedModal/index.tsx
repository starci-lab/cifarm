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
    DialogBody,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { NFTType } from "@/modules/entities"
import { NFTRarityEnum } from "@/modules/blockchain"
import { getNFTImage } from "@/app/utils"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { envConfig } from "@/env"

export const NFTClaimedModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFT_CLAIMED_DISCLOSURE)
    const nftName = useAppSelector((state) => state.modalReducer.nftClaimedModal.nftName)
    const nftType = useAppSelector((state) => state.modalReducer.nftClaimedModal.nftType)
    const rarity = useAppSelector((state) => state.modalReducer.nftClaimedModal.rarity)
    const network = envConfig().network
    const _nftType = nftType ?? NFTType.DragonFruit
    const _rarity = rarity ?? NFTRarityEnum.Common
    const _nftName = nftName ?? "Dragon Fruit"
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
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
                <DialogBody>
                    <div className="text-muted-foreground">
                        Congratulations! You have claimed the following NFT:
                    </div>
                    <Spacer y={4} />
                    <Image src={
                        (()=>{
                            if (!staticSwr.data) return ""
                            return getNFTImage({
                                nftType: _nftType,
                                staticData: staticSwr.data?.data,
                                network,
                                chainKey,
                            })
                        })()
                    } className="w-32 h-32 object-contain" />
                    <Spacer y={4} />
                    <div className="flex items-center gap-2">
                        <div>{_nftName}</div>
                        <NFTRarityBadge rarity={_rarity} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        color="default"
                        variant="flat"
                        className="w-full"
                        onClick={() => {
                            close()
                        }}
                    >   
                        Close
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
