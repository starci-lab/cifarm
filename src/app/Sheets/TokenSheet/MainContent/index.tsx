import {
    SheetTitle,
    SheetHeader,
    Spacer,
    PressableAction,
    Card,
    SheetBody,
    CardBody,
} from "@/components"
import React, { FC } from "react"
import {
    useGraphQLQueryStaticSwr,
    useTransferTokenFormik,
    useGraphQLQueryBlockchainBalancesSwr,
} from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    TRANSFER_TOKEN_FORMIK,
    GRAPHQL_QUERY_STATIC_SWR,
    GRAPHQL_QUERY_BLOCKCHAIN_BALANCES_SWR,
} from "@/app/constants"
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

    const dispatch = useAppDispatch()
    
    const { swr: balanceSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryBlockchainBalancesSwr>>(
        GRAPHQL_QUERY_BLOCKCHAIN_BALANCES_SWR
    )
  
    if (!tokenKey) {
        return null
    }
    const balance = balanceSwr.data?.data.blockchainBalances.tokens.find((token) => token.tokenKey === tokenKey)?.balance
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
