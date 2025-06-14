import {
    SheetTitle,
    SheetHeader,
    Spacer,
    PressableAction,
    Card,
    SheetBody,
    CardBody,
} from "@/components"
import React, { FC, useEffect } from "react"
import {
    useGraphQLQueryStaticSwr,
    useTransferTokenFormik,
} from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    TRANSFER_TOKEN_FORMIK,
    GRAPHQL_QUERY_STATIC_SWR,
} from "@/app/(core)/constants"
import {
    setTokenSheetPage,
    setTransferTab,
    TokenSheetPage,
    TransferTab,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import {
    DefaultToken,
} from "@/modules/blockchain"
import { envConfig } from "@/env"
import { HandArrowDown, HandCoins, PaperPlaneRight, QrCode, ArrowUpRight, ShoppingCart, DotsThree } from "@phosphor-icons/react"
import { TokenKey } from "@/modules/entities"

export const MainContent: FC = () => {  
    const tokenKey = useAppSelector((state) => state.sheetReducer.tokenSheet.tokenKey)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = envConfig().network

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const formik = useSingletonHook2<ReturnType<typeof useTransferTokenFormik>>(
        TRANSFER_TOKEN_FORMIK
    )

    useEffect(() => {
        if (tokenKey) {
            formik.setFieldValue("tokenKey", tokenKey)
        }
    }, [tokenKey])

    const dispatch = useAppDispatch()
    const balanceSwrs = useAppSelector((state) => state.sessionReducer.balanceSwrs)
    const balance = balanceSwrs[tokenKey ?? TokenKey.Native]?.data?.balance.balance ?? 0
    
    useEffect(() => {
        formik.setFieldValue("balance", balance)
    }, [balance])

    if (!tokenKey) {
        return null
    }
    const token = staticSwr.data?.data.tokens[tokenKey]?.[chainKey]?.[network]  

    return (
        <div>
            <SheetHeader>
                <SheetTitle>{token?.name}</SheetTitle>
            </SheetHeader>
            <SheetBody>
                <Card>
                    <CardBody className="px-3 py-2">
                        <div className="text-sm text-muted-foreground">
                            Balance
                        </div>
                        <div className="flex gap-1 text-xl font-bold">
                            <div>
                                {
                                    balance
                                }
                            </div>
                            <div>
                                {
                                    token?.symbol
                                }
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Spacer y={6} />
                <div className="grid grid-cols-3 gap-2">
                    <PressableAction
                        icon={<PaperPlaneRight />}
                        onClick={() => {
                            formik.setFieldValue(
                                "tokenKey",
                                tokenKey ?? DefaultToken.Native
                            )
                            dispatch(setTransferTab(TransferTab.Token))
                            dispatch(setTokenSheetPage(TokenSheetPage.Transfer ))
                        }}
                        name="Transfer"
                    />
                    <PressableAction
                        icon={<QrCode />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Receive"
                    />
                    <PressableAction
                        icon={<HandArrowDown />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Swap"
                    />
                    <PressableAction
                        icon={<HandCoins />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Stake"
                    />
                    <PressableAction
                        icon={<ArrowUpRight />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Bridge"
                    />
                    <PressableAction
                        icon={<ShoppingCart />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="Buy"
                    />
                    <PressableAction
                        icon={<DotsThree />}
                        onClick={() => {
                            console.log("Receive")
                        }}
                        name="More"
                    />
                </div>
            </SheetBody>
        </div>      
    )
}
