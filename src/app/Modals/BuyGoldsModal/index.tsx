"use client"
import {
    BUY_GOLDS_DISCLOSURE,
    GRAPHQL_MUTATION_CREATE_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import React, { FC, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    BuyCard,
    DialogBody,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import { toast, useGlobalAccountAddress, useGraphQLMutationCreateBuyGoldsSolanaTransactionSwrMutation, useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation, useGraphQLQueryStaticSwr } from "@/hooks"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { setSignTransactionModal, TransactionType, useAppDispatch, useAppSelector } from "@/redux"
import { formatNumber, NumberPattern } from "@/modules/common"
import { envConfig } from "@/env"

export const BuyGoldsModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_GOLDS_DISCLOSURE)
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = envConfig().network

    const iconMap: Record<number, string> = {
        0: assetIconMap[AssetIconId.Golds1].base.assetUrl,
        1: assetIconMap[AssetIconId.Golds2].base.assetUrl,
        2: assetIconMap[AssetIconId.Golds3].base.assetUrl,
    }

    const { swrMutation: createBuyGoldsSolanaTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationCreateBuyGoldsSolanaTransactionSwrMutation>
    >(GRAPHQL_MUTATION_CREATE_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendBuyGoldsSolanaTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationSendBuyGoldsSolanaTransactionSwrMutation>
    >(GRAPHQL_MUTATION_SEND_BUY_GOLDS_SOLANA_TRANSACTION_SWR_MUTATION)
    
    const { open: openSignTransactionModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(SIGN_TRANSACTION_DISCLOSURE)
    const dispatch = useAppDispatch()

    const { accountAddress } = useGlobalAccountAddress()

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>()
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Buy Golds</DialogTitle>
                </DialogHeader>     
                <DialogBody className="grid md:grid-cols-3 gap-2">
                    {
                        staticSwr.data?.data.goldPurchases[chainKey][network]?.options.map((goldPurchase, index) => (
                            <BuyCard
                                key={index}
                                title={`${formatNumber(goldPurchase.amount, NumberPattern.Second)}`}
                                imageUrl={iconMap[index]}
                                price={goldPurchase.price}
                                disabled={!!selectedIndex}
                                paymentKind={goldPurchase.paymentKind}
                                isLoading={
                                    selectedIndex === index &&
                                    createBuyGoldsSolanaTransactionSwrMutation.isMutating
                                }
                                classNames={{
                                    container: "h-full",
                                }}
                                onClick={async () => {
                                    if (!accountAddress) {
                                        throw new Error("No account address")
                                    }
                                    setSelectedIndex(index)
                                    try {
                                        const { data} = await createBuyGoldsSolanaTransactionSwrMutation.trigger({
                                            request: {
                                                selectionIndex: index,
                                                accountAddress,
                                            }
                                        })
                                        if (!data) {
                                            toast({
                                                title: "Failed to create transaction",
                                                variant: "destructive",
                                            })
                                            return
                                        }
                                        dispatch(setSignTransactionModal({
                                            type: TransactionType.SolanaRawTx,
                                            data: {
                                                serializedTx: data.serializedTx,
                                            },  
                                            postActionHook: async (signedSerializedTx) => {
                                                const { data } = await sendBuyGoldsSolanaTransactionSwrMutation.trigger({
                                                    request: {
                                                        serializedTx: Array.isArray(signedSerializedTx) ? signedSerializedTx[0] : signedSerializedTx,
                                                    },
                                                })
                                                if (!data) {
                                                    toast({
                                                        title: "Failed to send transaction",
                                                        variant: "destructive",
                                                    })
                                                    return ""
                                                }
                                                return data.txHash
                                            },
                                        }))
                                        openSignTransactionModal()
                                    } finally {
                                        setSelectedIndex(undefined)
                                    }
                                }}
                            />
                        ))
                    }
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
