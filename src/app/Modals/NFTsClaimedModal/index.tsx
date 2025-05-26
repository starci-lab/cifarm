"use client"
import { NFTS_CLAIMED_DISCLOSURE, QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import { ModalHeader, Image, NFTRarityBadge, ExtendedButton, ScrollArea, Card, CardBody, Spacer, ScrollBar } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { envConfig } from "@/env"
import { getNFTImage } from "@/app/utils"

export const NFTsClaimedModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFTS_CLAIMED_DISCLOSURE)
    const nftItems = useAppSelector((state) => state.modalReducer.nftsClaimedModal.nftItems)
    const network = envConfig().network
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="NFTs Claimed" />
                    </DialogTitle>
                </DialogHeader> 
                <DialogBody>
                    <div className="text-muted-foreground">
                        Congratulations! You have claimed the following NFTs:
                    </div>
                    <Spacer y={4} />
                    <div className="flex">
                        <ScrollArea type="always" className="w-1 flex-1">
                            <div className="flex gap-2 items-center">
                                {nftItems.map((nftItem) => (
                                    <Card key={nftItem.nftType}>
                                        <CardBody className="p-3 w-40">
                                            <Image src={
                                                (()=>{
                                                    if (!staticSwr.data) return ""
                                                    return getNFTImage({
                                                        nftType: nftItem.nftType,
                                                        staticData: staticSwr.data?.data,
                                                        network,
                                                    })
                                                })()
                                            } className="w-20 aspect-square object-contain" />
                                            <Spacer y={2} />
                                            <div>{nftItem.nftName}</div>
                                            <NFTRarityBadge rarity={nftItem.rarity} />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                            <Spacer y={4} />
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
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
