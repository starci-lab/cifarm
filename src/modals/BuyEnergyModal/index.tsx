"use client"
import {
    BUY_ENERGY_MODAL_DISCLOSURE,
    GRAPHQL_MUTATION_CREATE_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_MODAL_DISCLOSURE,
} from "@/singleton"
import { useSingletonHook } from "@/singleton"
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
import { useGlobalAccountAddress, useIsMobileDevice } from "@/hooks"
import { addErrorToast } from "@/components"
import {
    useGraphQLMutationCreateBuyEnergySolanaTransactionSwrMutation,
    useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation,
} from "@/singleton"
import { AssetIconId, assetIconMap } from "@/modules/assets"
import {
    setSignTransactionModalContent,
    TransactionType,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { envConfig } from "@/env"
import { ChainKey } from "@/modules/blockchain"
import {
    sessionDb,
    SessionDbKey,
    SolanaTransactionType,
} from "@/modules/dexie"
export const BuyEnergyModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        BUY_ENERGY_MODAL_DISCLOSURE
    )
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const network = envConfig().network
    const iconMap: Record<number, string> = {
        0: assetIconMap[AssetIconId.Energy].base.assetUrl,
        1: assetIconMap[AssetIconId.Energy].base.assetUrl,
        2: assetIconMap[AssetIconId.Energy].base.assetUrl,
    }

    const { swrMutation: createBuyEnergySolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationCreateBuyEnergySolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_CREATE_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swrMutation: sendBuyEnergySolanaTransactionSwrMutation } =
    useSingletonHook<
      ReturnType<
        typeof useGraphQLMutationSendBuyEnergySolanaTransactionSwrMutation
      >
    >(GRAPHQL_MUTATION_SEND_BUY_ENERGY_SOLANA_TRANSACTION_SWR_MUTATION)

    const { open: openSignTransactionModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_MODAL_DISCLOSURE)
    const dispatch = useAppDispatch()

    const { accountAddress } = useGlobalAccountAddress()

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

    const isMobileDevice = useIsMobileDevice()

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Buy Energy</DialogTitle>
                </DialogHeader>
                <DialogBody className="grid md:grid-cols-3 gap-2">
                    {staticData?.energyPurchases[network]?.options.map(
                        (energyPurchase, index) => {
                            if (!staticData?.tokens) return null
                            return (
                                <BuyCard
                                    key={index}
                                    title={`${energyPurchase.percentage}%`}
                                    imageUrl={iconMap[index]}
                                    price={energyPurchase.price}
                                    tokenKey={energyPurchase.tokenKey}
                                    chainKey={ChainKey.Solana}
                                    network={network}
                                    tokens={staticData?.tokens}
                                    isLoading={
                                        selectedIndex === index &&
                    createBuyEnergySolanaTransactionSwrMutation.isMutating
                                    }
                                    classNames={{
                                        container: "h-full",
                                    }}
                                    onClick={
                                        async () => {
                                            if (!accountAddress) {
                                                throw new Error("No account address")
                                            }
                                            setSelectedIndex(index)
                                            try {
                                                if (isMobileDevice) {
                                                    await sessionDb.keyValueStore.put({
                                                        key: SessionDbKey.SolanaTransaction,
                                                        value: SolanaTransactionType.BuyEnergy,
                                                    })
                                                }
                                                const { data } =
                        await createBuyEnergySolanaTransactionSwrMutation.trigger(
                            {
                                request: {
                                    selectionIndex: index,
                                    accountAddress,
                                },
                            }
                        )
                                                dispatch(
                                                    setSignTransactionModalContent({
                                                        type: TransactionType.SolanaRawTx,
                                                        data: {
                                                            serializedTx: data?.serializedTx ?? "",
                                                        },
                                                        postActionHook: async (signedSerializedTx) => {
                                                            const { data } =
                              await sendBuyEnergySolanaTransactionSwrMutation.trigger(
                                  {
                                      request: {
                                          serializedTx: Array.isArray(
                                              signedSerializedTx
                                          )
                                              ? signedSerializedTx[0]
                                              : signedSerializedTx,
                                      },
                                  }
                              )

                                                            return data?.txHash ?? ""
                                                        },
                                                    })
                                                )
                                                openSignTransactionModal()
                                            } catch (error) {
                                                addErrorToast({
                                                    errorMessage: (error as Error).message,
                                                })
                                            } finally {
                                                setSelectedIndex(undefined)
                                            }
                                        }}
                                />
                            )
                        }
                    )}
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}
