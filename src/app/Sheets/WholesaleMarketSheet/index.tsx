import {
    ExtendedButton,
    GridTable,
    ItemCard,
    PaymentIcon,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    Spacer,
    Title,
} from "@/components"
import React, { FC } from "react"
import { useGraphQLMutationCreateShipSolanaTransactionSwrMutation, useGraphQLMutationSendShipSolanaTransactionSwrMutation, useGraphQLQueryStaticSwr, useGraphQLQueryVaultCurrentSwr, useIsMobile, useGlobalAccountAddress } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_MUTATION_CREATE_SHIP_SOLANA_TRANSACTION_SWR_MUTATION, GRAPHQL_MUTATION_SEND_SHIP_SOLANA_TRANSACTION_SWR_MUTATION, GRAPHQL_QUERY_VAULT_CURRENT_SWR, QUERY_STATIC_SWR_MUTATION, SHEET_WHOLSALE_MARKET_DISCLOSURE, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { setSignTransactionModal, TransactionType, useAppDispatch } from "@/redux"
import { assetProductMap } from "@/modules/assets"
import { PaymentKind } from "@/modules/entities"

export const WholesaleMarketSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_WHOLSALE_MARKET_DISCLOSURE
    )

    const isMobile = useIsMobile()

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(QUERY_STATIC_SWR_MUTATION) 
    const { swr: vaultCurrentSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryVaultCurrentSwr>>(GRAPHQL_QUERY_VAULT_CURRENT_SWR)
    
    const { swrMutation: createShipSolanaTransactionSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationCreateShipSolanaTransactionSwrMutation>>(GRAPHQL_MUTATION_CREATE_SHIP_SOLANA_TRANSACTION_SWR_MUTATION)
    const { swrMutation: sendShipSolanaTransactionSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationSendShipSolanaTransactionSwrMutation>>(GRAPHQL_MUTATION_SEND_SHIP_SOLANA_TRANSACTION_SWR_MUTATION)
    
    const dispatch = useAppDispatch()
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
    )

    const { accountAddress } = useGlobalAccountAddress()
    
    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent side={isMobile ? "bottom" : "right"} className="flex flex-col justify-between">
                <div>
                    <SheetHeader>
                        <SheetTitle>Wholesale Market</SheetTitle>
                    </SheetHeader>
                    <Spacer y={6} />
                    <div>
                        <Title
                            title="Requirements"
                            tooltipString="Requirements for the wholesale market"
                        />
                        <Spacer y={4} />
                        <div>
                            <GridTable
                                enableScroll={false}
                                items={staticSwr.data?.data.wholesaleMarket.products || []}
                                contentCallback={({ quantity, productId }) => {
                                    const product = staticSwr.data?.data.products.find(
                                        (product) => product.id === productId
                                    )
                                    if (!product) throw new Error("Product not found")
                                    return (
                                        <ItemCard
                                            name={assetProductMap[product?.displayId].name}
                                            imageUrl={
                                                assetProductMap[product?.displayId].base.assetUrl
                                            }
                                            showTooltip={true}
                                            description={
                                                assetProductMap[product?.displayId].description
                                            }
                                            quantity={quantity}
                                            isQuality={product.isQuality}
                                            stackable={true}
                                        />
                                    )
                                }}
                            />
                        </div>
                        <Spacer y={6} />
                        <div>
                            <Title
                                title="Payment"
                                tooltipString="Payment for the wholesale market"
                            />
                            <Spacer y={4} />
                            <div className="flex items-center gap-2">
                                <PaymentIcon
                                    paymentKind={
                                        staticSwr.data?.data.wholesaleMarket.paymentKind ||
                    PaymentKind.Token
                                    }
                                    className="w-8 h-8"
                                />
                                <div className="text-2xl">
                                    {vaultCurrentSwr.data?.data.vaultCurrent.paidAmount}
                                </div>
                            </div>
                            <Spacer y={2} />
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="text-xs">
                                Token locked: {vaultCurrentSwr.data?.data.vaultCurrent.tokenLocked}  
                                </div>
                                <div className="text-xs">
                            Paid count: {vaultCurrentSwr.data?.data.vaultCurrent.paidCount}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Spacer y={6} />
                </div>
                <ExtendedButton className="w-full" onClick={async () => {
                    if (!accountAddress) throw new Error("Account address is required")
                    const { data } = await createShipSolanaTransactionSwrMutation.trigger({
                        request: {
                            accountAddress
                        }
                    })
                    if (!data) throw new Error("Failed to create ship solana transaction")
                    dispatch(setSignTransactionModal({
                        type: TransactionType.SolanaRawTx,
                        data: {
                            serializedTx: data.serializedTx
                        },
                        postActionHook: async (signedSerializedTx) => {
                            const { data: sendShipSolanaTransactionData } = await sendShipSolanaTransactionSwrMutation.trigger({
                                request: {
                                    serializedTx: signedSerializedTx
                                }
                            })
                            if (!sendShipSolanaTransactionData) throw new Error("Failed to send ship solana transaction")
                            return sendShipSolanaTransactionData.txHash
                        }
                    }))
                    open()
                }}>
          Ship
                </ExtendedButton>
            </SheetContent>
        </Sheet>
    )
}
