"use client"
import {
    BUY_ENERGY_DISCLOSURE,
    GRAPHQL_MUTATION_CREATE_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION,
    QUERY_STATIC_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
} from "@/app/(core)/constants"
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
import { toast, useGlobalAccountAddress, useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation, useGraphQLMutationCreateBuyEnergySolanaTransactionSwrMutation, useGraphQLQueryStaticSwr } from "@/hooks"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import { setSignTransactionModal, TransactionType, useAppDispatch } from "@/redux"
import { envConfig } from "@/env"
import { ChainKey } from "@/modules/blockchain"
export const BuyEnergyModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(BUY_ENERGY_DISCLOSURE)
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)

    const network = envConfig().network

    const iconMap: Record<number, string> = {
        0: assetIconMap[AssetIconId.Energy].base.assetUrl,
        1: assetIconMap[AssetIconId.Energy].base.assetUrl,
        2: assetIconMap[AssetIconId.Energy].base.assetUrl,
    }

    const { swrMutation: createBuyEnergySolanaTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationCreateBuyEnergySolanaTransactionSwrMutation>
    >(GRAPHQL_MUTATION_CREATE_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendBuyEnergySolanaTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation>
    >(GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION)
    
    const { open: openSignTransactionModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(SIGN_TRANSACTION_DISCLOSURE)
    const dispatch = useAppDispatch()

    const { accountAddress } = useGlobalAccountAddress()

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Buy Energy</DialogTitle>
                </DialogHeader>     
                <DialogBody className="grid md:grid-cols-3 gap-2">
                    {
                        staticSwr.data?.data.energyPurchases[network]?.options.map((energyPurchase, index) => {
                            if (!staticSwr.data?.data.tokens) return null
                            return (
                                <BuyCard
                                    key={index}
                                    title={`${energyPurchase.percentage}%`}
                                    imageUrl={iconMap[index]}
                                    price={energyPurchase.price}
                                    tokenKey={energyPurchase.tokenKey}
                                    chainKey={ChainKey.Solana}
                                    network={network}
                                    tokens={staticSwr.data?.data.tokens}
                                    isLoading={
                                        selectedIndex === index &&
                                    createBuyEnergySolanaTransactionSwrMutation.isMutating
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
                                            const { data} = await createBuyEnergySolanaTransactionSwrMutation.trigger({
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
                                                    const { data } = await sendBuyEnergySolanaTransactionSwrMutation.trigger({
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
                            )
                        })
                    }
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
