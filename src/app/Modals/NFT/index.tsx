"use client"
import { NFT_DISCLOSURE, TRANSFER_NFT_FORMIK } from "@/app/constants"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useAppSelector, useAppDispatch, setTransferTab, TransferTab  } from "@/redux"
import React, { FC } from "react"
import { ModalHeader, PressableAction } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,   
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { QrCodeIcon, SendHorizonalIcon } from "lucide-react"
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
                <DialogFooter>  
                    <PressableAction icon={<SendHorizonalIcon className="w-8 h-8 min-w-8 min-h-8" />}
                        onClick={() => {
                            dispatch(setTransferTab(TransferTab.NFT))
                            formik.setFieldValue("collectionKey", nftData?.collectionKey ?? "")
                            formik.setFieldValue("nft", nftData ?? undefined)
                            router.push(pathConstants.transfer)
                            close()
                        }}
                        name="Transfer" />
                    <PressableAction icon={<QrCodeIcon className="w-8 h-8 min-w-8 min-h-8" />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Receive" />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
