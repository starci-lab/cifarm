"use client"
import { NFT_DISCLOSURE, TRANSFER_NFT_FORMIK } from "@/app/constants"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useAppSelector, useAppDispatch, setTransferTab, TransferTab, setWrapNFTData } from "@/redux"
import React, { FC } from "react"
import { ModalHeader, PressableAction, Image, Spacer } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { QrCodeIcon, SendHorizonalIcon, ShoppingCartIcon, EllipsisIcon, PackageIcon } from "lucide-react"
import { useRouterWithSearchParams, useTransferNFTFormik } from "@/hooks" 
import { pathConstants } from "@/constants"

export const NFTModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(NFT_DISCLOSURE)
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const router = useRouterWithSearchParams()
    const dispatch = useAppDispatch()
    const { nftData } = useAppSelector((state) => state.modalReducer.nftModal)
    const formik = useSingletonHook2<ReturnType<typeof useTransferNFTFormik>>(
        TRANSFER_NFT_FORMIK
    )
    const account = accounts.find((account) => account.id === currentId)
    if (!account) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title={nftData?.name ?? "NFT"} />
                    </DialogTitle>
                </DialogHeader> 
                <div>
                    <div className="border rounded-md p-2 w-fit">
                        <Image src={nftData?.imageUrl ?? ""} alt={nftData?.name ?? ""} className="w-32 h-32 object-contain" />
                    </div>
                    <Spacer y={4} />
                    <div className="grid grid-cols-4 gap-2">
                        <PressableAction
                            icon={<SendHorizonalIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                dispatch(setTransferTab(TransferTab.NFT))
                                formik.setFieldValue("collectionKey", nftData?.collectionKey ?? "")
                                formik.setFieldValue("nft", nftData ?? undefined)
                                router.push(pathConstants.transfer)
                                close()
                            }}
                            name="Transfer"
                        />
                        <PressableAction
                            icon={<QrCodeIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="Receive"
                        />
                        <PressableAction
                            icon={<PackageIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                router.push("/wrap/solana")
                                if (!nftData) {
                                    throw new Error("NFT data is undefined")
                                }
                                dispatch(setWrapNFTData(nftData))
                                close()
                            }}
                            name="Wrap"
                        />
                        <PressableAction
                            icon={<ShoppingCartIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="Buy"
                        />
                        <PressableAction
                            icon={<EllipsisIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="More"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
