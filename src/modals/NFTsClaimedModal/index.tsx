"use client"
import { NFTS_CLAIMED_MODAL_DISCLOSURE } from "@/singleton"
import { useSingletonHook } from "@/singleton"
import { useAppSelector } from "@/redux"
import React, { FC } from "react"
import {
    ModalHeader,
    Image,
    NFTRarityBadge,
    ExtendedButton,
    ScrollArea,
    Card,
    CardBody,
    Spacer,
    ScrollBar,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { NFTRarityEnum } from "@/types"

export const NFTsClaimedModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFTS_CLAIMED_MODAL_DISCLOSURE)
    const nftItems = useAppSelector(
        (state) => state.modalReducer.nftsClaimedModal.nftItems
    )
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
                                    <Card key={nftItem.nftCollectionKey}>
                                        <CardBody className="p-3 w-40">
                                            <Image
                                                src={(() => {
                                                    // will put the image here
                                                    return ""
                                                })()}
                                                className="w-20 aspect-square object-contain"
                                            />
                                            <Spacer y={2} />
                                            <div>{nftItem.nftName}</div>
                                            <NFTRarityBadge
                                                rarity={nftItem.rarity as NFTRarityEnum}
                                            />
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
