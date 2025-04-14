"use client"
import React, { FC } from "react"
import { Container, Header, PressableAction, Spacer, Switch } from "@/components"
import { setTransferTab, switchToken, TransferTab, useAppDispatch, useAppSelector } from "@/redux"
import { DefaultToken } from "@/modules/blockchain"
import { SendHorizonalIcon, QrCodeIcon, ArrowLeftRightIcon, HandCoinsIcon, SendToBackIcon, ShoppingCartIcon, EllipsisIcon } from "lucide-react"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useTransferTokenFormik } from "@/hooks"
import { TRANSFER_TOKEN_FORMIK, TRANSFER_TOKEN_DISCLOSURE } from "../constants"
import { useDisclosure } from "react-use-disclosure"

const Page: FC = () => {
    const tokenKey = useAppSelector(
        (state) => state.sessionReducer.tokenKey
    )
    const tokens = useAppSelector(
        (state) => state.sessionReducer.tokens
    )
    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(TRANSFER_TOKEN_FORMIK)
    const dispatch = useAppDispatch()
    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )
    const balanceSwr = balanceSwrs[tokenKey ?? DefaultToken.Native]
    const token = tokens[tokenKey]
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(TRANSFER_TOKEN_DISCLOSURE)
    return (
        <Container hasPadding>
            <div>
                <Header title={token?.name} />
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
                    <Spacer y={6} />
                    <div className="grid grid-cols-4 gap-2">
                        <PressableAction
                            icon={<SendHorizonalIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                formik.setFieldValue("tokenKey", tokenKey ?? DefaultToken.Native)
                                dispatch(setTransferTab(TransferTab.Token))
                                open()
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
            </div>
        </Container>
    )
}

export default Page
