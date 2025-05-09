import {
    SheetTitle,
    SheetHeader,
    Spacer,
    PressableAction,
    Card,
    CardContent,
} from "@/components"
import React, { FC } from "react"
import {
    useGraphQLQueryStaticSwr,
    useTransferTokenFormik,
} from "@/hooks"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import {
    TRANSFER_TOKEN_FORMIK,
    GRAPHQL_QUERY_STATIC_SWR,
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
import {
    SendHorizonalIcon,
    EllipsisIcon,
    ShoppingCartIcon,
    ArrowLeftRightIcon,
    HandCoinsIcon,
    QrCodeIcon,
    SendToBackIcon,
} from "lucide-react"
import { envConfig } from "@/env"

export const MainContent: FC = () => {  
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
                        dispatch(setTokenSheetPage(TokenSheetPage.Transfer ))
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
    )
}
