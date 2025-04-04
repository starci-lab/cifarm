"use client"
import { TOKEN_DISCLOSURE, TRANSFER_TOKEN_FORMIK } from "@/app/constants"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    useAppSelector,
    useAppDispatch,
    setTransferTab,
    TransferTab,
    setTokenModal,
} from "@/redux"
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
import { useRouterWithSearchParams, useTransferTokenFormik } from "@/hooks"
import { pathConstants } from "@/constants"
import { DefaultToken } from "@/modules/blockchain"

export const TokenModal: FC = () => {
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    const router = useRouterWithSearchParams()
    const { tokenKey } = useAppSelector((state) => state.modalReducer.tokenModal)
    const { isOpen, toggle, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(TOKEN_DISCLOSURE)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const token = tokens[tokenKey ?? DefaultToken.Native]
    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )
    if (!account) {
        return null
    }
    const dispatch = useAppDispatch()
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title={token?.name ?? "Token"} />
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <PressableAction
                        icon={<SendHorizonalIcon className="w-8 h-8 min-w-8 min-h-8" />}
                        onClick={() => {
                            formik.setFieldValue("tokenKey", tokenKey ?? DefaultToken.Native)
                            dispatch(setTransferTab(TransferTab.Token))
                            router.push(pathConstants.transfer)
                            dispatch(
                                setTokenModal({
                                    tokenKey: tokenKey ?? DefaultToken.Native,
                                })
                            )
                            close()
                        }}
                        name="Transfer"
                    />
                    <PressableAction
                        icon={<QrCodeIcon className="w-8 h-8 min-w-8 min-h-8" />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Receive"
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
