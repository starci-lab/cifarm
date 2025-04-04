"use client"
import { TOKEN_DISCLOSURE, TRANSFER_TOKEN_FORMIK } from "@/app/constants"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    useAppSelector,
    useAppDispatch,
    setTransferTab,
    TransferTab,
    setTokenModal,
    switchToken,
} from "@/redux"
import React, { FC } from "react"
import { ModalHeader, PressableAction, Spacer, Switch } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDisclosure } from "react-use-disclosure"
import { QrCodeIcon, SendHorizonalIcon, SendToBackIcon, HandCoinsIcon, EllipsisIcon, ArrowLeftRightIcon, ShoppingCartIcon } from "lucide-react"
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
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    const balanceSwr = balanceSwrs[tokenKey ?? DefaultToken.Native]
    const dispatch = useAppDispatch()
    if (!account) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title={token?.name ?? "Token"} />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <div className="flex justify-between items-center">  
                        <div className="flex gap-2 items-end">
                            <div className="text-4xl font-bold">{balanceSwr.data ?? 0}</div>
                            <div className="text-muted-foreground">{token?.symbol ?? ""}</div>
                        </div>
                        <Switch checked={token.enabled} onCheckedChange={() => {
                            dispatch(switchToken({ id: tokenKey ?? DefaultToken.Native, enabled: !token.enabled }))
                        }} />
                    </div>
                    <Spacer y={4} />
                    <div className="grid grid-cols-4 gap-2">
                        <PressableAction
                            icon={<SendHorizonalIcon className="w-5 h-5 min-w-5 min-h-5" />}
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
                            icon={<QrCodeIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="Receive"
                        />
                        <PressableAction
                            icon={<ArrowLeftRightIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="Swap"
                        />
                        <PressableAction
                            icon={<HandCoinsIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="Stake"
                        />
                        <PressableAction
                            icon={<SendToBackIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                console.log("Receive")
                            }}
                            name="Bridge"
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
