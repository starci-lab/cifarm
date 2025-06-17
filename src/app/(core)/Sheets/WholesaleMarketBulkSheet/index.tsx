import {
    ExtendedButton,
    GridTable,
    ItemCard,
    TokenIcon,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetBody,
    Spacer,
    Title,
    Image,
    List,
    Badge,
} from "@/components"
import React, { FC } from "react"
import { useGraphQLMutationCreateShipSolanaTransactionSwrMutation, useGraphQLMutationSendShipSolanaTransactionSwrMutation, useGraphQLQueryStaticSwr, useGraphQLQueryVaultCurrentSwr, useIsMobile, useGlobalAccountAddress, useGraphQLQueryInventoriesSwr, useGraphQLQueryUserSwr, useGraphQLQueryBulkPaidsSwr } from "@/hooks"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_MUTATION_CREATE_SHIP_SOLANA_TRANSACTION_SWR_MUTATION, GRAPHQL_MUTATION_SEND_SHIP_SOLANA_TRANSACTION_SWR_MUTATION, GRAPHQL_QUERY_BULK_PAIDS_SWR, GRAPHQL_QUERY_INVENTORIES_SWR, GRAPHQL_QUERY_USER_SWR, GRAPHQL_QUERY_VAULT_CURRENT_SWR, QUERY_STATIC_SWR_MUTATION, SHEET_WHOLSALE_MARKET_BULK_DISCLOSURE, SIGN_TRANSACTION_DISCLOSURE } from "@/app/(core)/constantsd"
import { setSignTransactionModal, TransactionType, useAppDispatch, useAppSelector } from "@/redux"
import { assetProductMap, assetIconMap, AssetIconId } from "@/modules/assets"
import { partitionInventories } from "@/modules/entities"
import { cn } from "@/utils"
import { ArrowCounterClockwise } from "@phosphor-icons/react"
import { ChainKey } from "@/modules/blockchain"
import { envConfig } from "@/env"
import { computePaidAmount, VaultData } from "@/modules/entities"
import { getPercentageString } from "@/modules/common"

export const WholesaleMarketBulkSheet: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_WHOLSALE_MARKET_BULK_DISCLOSURE
    )

    const isMobile = useIsMobile()

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(QUERY_STATIC_SWR_MUTATION)
    const { swrMutation: createShipSolanaTransactionSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationCreateShipSolanaTransactionSwrMutation>>(GRAPHQL_MUTATION_CREATE_SHIP_SOLANA_TRANSACTION_SWR_MUTATION)
    const { swrMutation: sendShipSolanaTransactionSwrMutation } = useSingletonHook<ReturnType<typeof useGraphQLMutationSendShipSolanaTransactionSwrMutation>>(GRAPHQL_MUTATION_SEND_SHIP_SOLANA_TRANSACTION_SWR_MUTATION)

    const { swr: bulkPaidsSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryBulkPaidsSwr>>(GRAPHQL_QUERY_BULK_PAIDS_SWR)    
    const dispatch = useAppDispatch()
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
    )

    const { accountAddress } = useGlobalAccountAddress()
    const wholesaleMarketBulkSheet = useAppSelector((state) => state.sheetReducer.wholesaleMarketBulkSheet)
    const bulk = staticSwr.data?.data.activeSeason.bulks.find(
        (bulk) => bulk.id === wholesaleMarketBulkSheet.bulkId
    )
    const inventories = useAppSelector((state) => state.sessionReducer.inventories)
    if (!bulk) return null
    if (!wholesaleMarketBulkSheet.bulkId) return null
    if (!staticSwr.data?.data) return null

    const { inventoryMap } = partitionInventories({
        staticData: staticSwr.data?.data,
        inventories,
        bulkId: wholesaleMarketBulkSheet.bulkId
    })

    const { swr: userSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryUserSwr>>(GRAPHQL_QUERY_USER_SWR)
    const { swr: inventoriesSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryInventoriesSwr>>(GRAPHQL_QUERY_INVENTORIES_SWR)
    const { swr: vaultCurrentSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryVaultCurrentSwr>>(GRAPHQL_QUERY_VAULT_CURRENT_SWR)
    const network = envConfig().network
    
    if (!vaultCurrentSwr.data?.data.vaultCurrent.data.find((vaultCurrent) => vaultCurrent.tokenKey === bulk.tokenKey)) {
        return null
    }
    const bulkPaid = bulkPaidsSwr.data?.data.bulkPaids.find(
        (bulkPaid) => bulkPaid.bulkId === bulk.id
    ) || {
        count: 0,
        decrementPercentage: 0,
        bulkId: bulk.id
    }
    return (
        <Sheet open={isOpen} onOpenChange={toggle}>
            <SheetContent side={isMobile ? "bottom" : "right"} className="flex flex-col justify-between">
                <div>
                    <SheetHeader>
                        <SheetTitle>{bulk.bulkName}</SheetTitle>
                    </SheetHeader>
                    <SheetBody>
                        <Title
                            title="Requirements"
                            tooltipString="Requirements for the wholesale market"
                        />
                        <Spacer y={4} />
                        <div className="bg-content-2 rounded-lg p-3">
                            <GridTable
                                classNames={{
                                    container: "grid-none flex flex-wrap gap-2 justify-start",
                                }}
                                enableScroll={false}
                                items={bulk.products || []}
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
                                            classNames={
                                                {
                                                    quantity: cn({
                                                        "text-destructive": !inventoryMap[productId.toString()]?.enough
                                                    })
                                                }
                                            }
                                            quantity={`${inventoryMap[productId.toString()]?.totalQuantity ?? 0} / ${quantity}`}
                                            isQuality={product.isQuality}
                                            stackable={true}
                                        />
                                    )
                                }}
                            />
                        </div>
                        <Spacer y={6} />
                        <div>
                            <div className="flex items-center justify-between">
                                <Title
                                    title="Payment"
                                    tooltipString="Payment for the wholesale market"
                                />
                                <ExtendedButton color="secondary" size="icon" variant="flat" onClick={async () => {
                                    await Promise.all([
                                        inventoriesSwr.mutate(),
                                        userSwr.mutate(),
                                        vaultCurrentSwr.mutate(),
                                        bulkPaidsSwr.mutate()
                                    ])
                                }}>
                                    <ArrowCounterClockwise />
                                </ExtendedButton>
                            </div>
                            <Spacer y={4} />
                            <List
                                enableScroll={false}
                                items={[
                                    {
                                        icon: <TokenIcon 
                                            chainKey={ChainKey.Solana}
                                            network={network}
                                            tokens={staticSwr.data?.data.tokens}
                                            tokenKey={bulk.tokenKey}
                                            className="w-6 h-6"
                                        />,
                                        name: staticSwr.data?.data?.tokens?.[bulk.tokenKey]?.[ChainKey.Solana]?.[network]?.name,
                                        amount: computePaidAmount({
                                            vaultData: vaultCurrentSwr.data?.data.vaultCurrent.data.find((vaultCurrent) => vaultCurrent.tokenKey === bulk.tokenKey) as VaultData,
                                            bulk,
                                            bulkPaid
                                        }),
                                        decrementPercentage: bulkPaid.decrementPercentage
                                    },
                                    {
                                        icon: <Image src={assetIconMap[AssetIconId.TCIFARM].base.assetUrl} className="w-6 h-6" />,
                                        name: "tCIFARM",
                                        amount: bulk.tCIFARM
                                    }
                                ]}
                                contentCallback={({ icon, name, amount, decrementPercentage }) => {
                                    return <div className="flex justify-between items-center w-full px-3 py-2 rounded-lg bg-content-2 bg-content-2">
                                        <div className="flex items-center gap-2">
                                            {icon}
                                            <div>
                                                {name}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                {amount}
                                            </div>
                                            {
                                                decrementPercentage !== undefined && (
                                                    <Badge variant="destructive">
                                                        {`-${getPercentageString(decrementPercentage)}`}
                                                    </Badge>
                                                )
                                            }
                                        </div>
                                    </div>
                                }}
                            />
                        </div>     
                        <Spacer y={6} />
                        <div>
                            <Title
                                title="Paid History"
                                tooltipString="Paid history for this bulk"
                            />
                            <Spacer y={4} />
                            <List
                                enableScroll={false}
                                items={[
                                    {
                                        title: "Count",
                                        description: "Count how many times this bulk has been paid",
                                        value: bulkPaid.count
                                    },
                                ]}
                                contentCallback={({ title, description, value }) => {
                                    return <div className="flex justify-between items-center w-full px-3 py-2 rounded-lg bg-content-2 bg-content-2">
                                        <Title  
                                            classNames={{
                                                title: "text-muted-foreground",
                                                tooltip: "text-muted-foreground"
                                            }}
                                            title={title}
                                            tooltipString={description}
                                        />
                                        <div>
                                            {value}
                                        </div>
                                    </div>
                                }}
                            />
                        </div>  
                    </SheetBody>
                </div>
                <SheetFooter>
                    <ExtendedButton className="w-full" onClick={async () => {
                        if (!accountAddress) throw new Error("Account address is required")
                        const { data } = await createShipSolanaTransactionSwrMutation.trigger({
                            request: {
                                accountAddress,
                                bulkId: bulk.id
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
                                        serializedTx: Array.isArray(signedSerializedTx) ? signedSerializedTx[0] : signedSerializedTx,
                                    }
                                })
                                if (!sendShipSolanaTransactionData) throw new Error("Failed to send ship solana transaction")
                                await Promise.all([
                                    inventoriesSwr.mutate(),
                                    userSwr.mutate(),
                                    vaultCurrentSwr.mutate()
                                ])
                                return sendShipSolanaTransactionData.txHash
                            }
                        }))
                        open()
                    }}
                    isLoading={createShipSolanaTransactionSwrMutation.isMutating}
                    disabled={!Object.values(inventoryMap).every((inventory) => inventory.enough)}
                    >
                        Ship
                    </ExtendedButton>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
