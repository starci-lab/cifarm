import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    Card,
    CardContent,
    Spacer,
    PressableAction,
} from "@/components"
import React, { FC } from "react"
import { useGraphQLQueryStaticSwr, useIsMobile, useTransferTokenFormik } from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_QUERY_STATIC_SWR, SHEET_TOKEN_DISCLOSURE, SHEET_TRANSFER_TOKEN_DISCLOSURE, TRANSFER_TOKEN_FORMIK } from "@/app/constants"
import { setTransferTab, TransferTab, useAppDispatch, useAppSelector } from "@/redux"
import { envConfig } from "@/env"
import { DefaultToken } from "@/modules/blockchain"
import { SendHorizonalIcon, QrCodeIcon, ArrowLeftRightIcon, HandCoinsIcon, SendToBackIcon, ShoppingCartIcon, EllipsisIcon } from "lucide-react"
export const TokenSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_TOKEN_DISCLOSURE
    )

    const { open: openTransferTokenSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_TRANSFER_TOKEN_DISCLOSURE
    )

    const isMobile = useIsMobile()

    const tokenKey = useAppSelector((state) => state.sheetReducer.tokenSheet.tokenKey)
    const balanceSwrs = useAppSelector((state) => state.sessionReducer.balanceSwrs)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = envConfig().network

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )

    const dispatch = useAppDispatch()
    
    if (!tokenKey) {
        return null
    }

    const balanceSwr = balanceSwrs[tokenKey]
    const token = staticSwr.data?.data.tokens[tokenKey]?.[chainKey]?.[network]
    
    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent side={isMobile ? "bottom" : "right"} className="flex flex-col justify-between">
                <div>
                    <SheetHeader>
                        <SheetTitle>{token?.name}</SheetTitle>
                    </SheetHeader>
                    <Spacer y={6} />
                    <Card>
                        <CardContent className="px-3 py-2">
                            <div className="text-sm text-muted-foreground">
                            Balance
                            </div>
                            <div className="flex gap-1 text-xl font-bold">
                                <div>
                                    {
                                        balanceSwr.data
                                    }
                                </div>
                                <div>
                                    {
                                        token?.symbol
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Spacer y={6} />
                    <div className="grid grid-cols-3 gap-2">
                        <PressableAction
                            icon={<SendHorizonalIcon className="w-5 h-5 min-w-5 min-h-5" />}
                            onClick={() => {
                                formik.setFieldValue(
                                    "tokenKey",
                                    tokenKey ?? DefaultToken.Native
                                )
                                dispatch(setTransferTab(TransferTab.Token))
                                openTransferTokenSheet()
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
            </SheetContent>
        </Sheet>
    )
}
