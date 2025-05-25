"use client"
import {
    GRAPHQL_QUERY_STATIC_SWR,
    HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION,
    HONEYCOMB_SEND_TRANSACTIONS_SWR_MUTATION,
    SIGN_SOLANA_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_NFT_SWR_MUTATION,
    TRANSFER_TOKEN_SWR_MUTATION,
} from "@/app/constants"
import { truncateString } from "@/modules/common"
import { useSingletonHook, useSingletonHook2 } from "@/modules/singleton-hook"
import { Image, List, Snippet, Spacer } from "@/components"
import {
    HoneycombProtocolRawTxData,
    HoneycombProtocolRawTxsData,
    SolanaRawTxData,
    SolanaRawTxsData,
    SuiRawTxData,
    SuiRawTxsData,
    TransactionType,
    TransferNFTData,
    TransferTokenData,
    useAppSelector,
} from "@/redux"
import React, { FC } from "react"
import { blockchainMap, explorerUrl } from "@/modules/blockchain"
import {
    useGraphQLQueryStaticSwr,
    useHoneycombSendTransactionsSwrMutation,
    useHoneycombSendTransactionSwrMutation,
    useSignSolanaTransactionTxSwrMutation,
    useRouterWithSearchParams,
    useTransferNFTSwrMutation,
    useTransferTokenSwrMutation,
} from "@/hooks"
import { ExtendedButton, ModalHeader, DownloadButton } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogBody,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks"
import { useDisclosure } from "react-use-disclosure"
import useSWRMutation from "swr/mutation"
import { pathConstants } from "@/constants"

interface ProviderInfo {
  name: string;
}

const DURATION = 10000 // 10s
export const SignTransactionModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SIGN_TRANSACTION_DISCLOSURE
    )

    const { swrMutation: honeycombSendTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useHoneycombSendTransactionSwrMutation>
  >(HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION)

    const { swrMutation: honeycombSendTransactionsSwrMutation } =
    useSingletonHook<
      ReturnType<typeof useHoneycombSendTransactionsSwrMutation>
    >(HONEYCOMB_SEND_TRANSACTIONS_SWR_MUTATION)

    const { swrMutation: transferTokenSwrMutation } = useSingletonHook2<
    ReturnType<typeof useTransferTokenSwrMutation>
  >(TRANSFER_TOKEN_SWR_MUTATION)

    const { swrMutation: transferNFTSwrMutation } = useSingletonHook2<
    ReturnType<typeof useTransferNFTSwrMutation>
  >(TRANSFER_NFT_SWR_MUTATION)

    const router = useRouterWithSearchParams()

    const type = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.type
    )
    const data = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.data
    )
    const extraAction = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.extraAction
    )
    const postActionHook = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.postActionHook
    )
    const network = useAppSelector((state) => state.sessionReducer.network)

    const { toast } = useToast()

    const addTxHashToast = (txHash: string) =>
        toast({
            duration: DURATION,
            title: "Tx hash",
            description: truncateString(txHash, 10, 4),
            action: (
                <ExtendedButton
                    variant="outline"
                    onClick={() => {
                        window.open(
                            explorerUrl({
                                chainKey,
                                network,
                                value: txHash,
                                type: "tx",
                            }),
                            "_blank"
                        )
                    }}
                >
          View
                </ExtendedButton>
            ),
            variant: "default",
        })

    const addErrorToast = (errorMessage: string = "Failed to sign transaction") =>
        toast({
            duration: DURATION,
            title: "Error",
            description: truncateString(errorMessage, 400, 0),
            variant: "destructive",
        })

    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )

    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )
    
    const collections = staticSwr.data?.data.nftCollections || {}

    const { swrMutation: signSolanaTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useSignSolanaTransactionTxSwrMutation>
  >(SIGN_SOLANA_TRANSACTION_SWR_MUTATION)

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const tokens = staticSwr.data?.data.tokens || {}

    const providers: Record<TransactionType, ProviderInfo> = {
        [TransactionType.TransferToken]: {
            name: "Transfer Token",
        },
        [TransactionType.HoneycombProtocolRawTx]: {
            name: "Honeycomb Protocol Raw Tx",
        },
        [TransactionType.TransferNFT]: {
            name: "Transfer NFT",
        },
        [TransactionType.HoneycombProtocolRawTxs]: {
            name: "Honeycomb Protocol Raw Txs",
        },
        [TransactionType.SolanaRawTx]: {
            name: "Solana Raw Tx",
        },
        [TransactionType.SolanaRawTxs]: {
            name: "Solana Raw Txs",
        },
        [TransactionType.SuiRawTx]: {
            name: "Sui Raw Tx",
        },
        [TransactionType.SuiRawTxs]: {
            name: "Sui Raw Txs",
        },
    }

    const { trigger, isMutating } = useSWRMutation(
        "SIGN_TRANSACTION",
        async () => {
            try {
                let txHash = ""
                switch (type) {
                case TransactionType.HoneycombProtocolRawTx: {
                    //return await honeycombSendTransactionSwrMutation.trigger(data)
                    // get the edge client
                    const { txResponse } = data as HoneycombProtocolRawTxData
                    const response = await honeycombSendTransactionSwrMutation.trigger({
                        transaction: txResponse,
                    })
                    if (!response) throw new Error("Failed to send transaction")
                    if (response.error) {
                        throw new Error(response.error)
                    }
                    txHash = response.signature?.toString() ?? ""
                    break
                }
                case TransactionType.HoneycombProtocolRawTxs: {
                    const { txResponses } = data as HoneycombProtocolRawTxsData
                    const responses =
              await honeycombSendTransactionsSwrMutation.trigger({
                  transactions: txResponses,
              })
                    if (!responses) throw new Error("Failed to send transaction")
                    // last transaction bundle response
                    const lastResponse = responses.at(-1)?.responses[0]
                    if (!lastResponse) throw new Error("Failed to send transaction")
                    if (lastResponse.error) {
                        throw new Error(lastResponse.error)
                    }
                    txHash = lastResponse.signature ?? ""
                    break
                }
                case TransactionType.TransferToken: {
                    const { tokenKey, amount, recipientAddress } =
              data as TransferTokenData
                    const { txHash: txHashResponse } =
              await transferTokenSwrMutation.trigger({
                  amount,
                  tokenKey,
                  recipientAddress,
              })
                    txHash = txHashResponse

                    await balanceSwrs[tokenKey].mutate()

                    break
                }
                case TransactionType.TransferNFT: {
                    const { nft, recipientAddress, collectionKey } =
              data as TransferNFTData
                    const { txHash: txHashResponse } =
              await transferNFTSwrMutation.trigger({
                  nftAddress: nft.nftAddress,
                  recipientAddress,
                  collectionKey,
              })
                    txHash = txHashResponse
                    router.push(pathConstants.collections)
                    break
                }
                case TransactionType.SolanaRawTx: {
                    const { serializedTx } = data as SolanaRawTxData
                    const { serializedTxs: signedSerializedTx } = await signSolanaTransactionSwrMutation.trigger({
                        serializedTxs: serializedTx,
                    })
                    // decode the serializedTx
                    if (postActionHook) {
                        txHash = await postActionHook(signedSerializedTx)
                    } else {
                        throw new Error("No post action hook")
                    }
                    break
                }
                case TransactionType.SolanaRawTxs: {
                    const { serializedTxs } = data as SolanaRawTxsData
                    const { serializedTxs: signedSerializedTxs } = await signSolanaTransactionSwrMutation.trigger({
                        serializedTxs,
                    })
                    if (postActionHook) {
                        txHash = await postActionHook(signedSerializedTxs)
                    } else {
                        throw new Error("No post action hook")
                    }
                    break
                }
                case TransactionType.SuiRawTx: {
                    const { serializedTx } = data as SuiRawTxData
                    console.log("serializedTx", serializedTx)
                    break
                }
                case TransactionType.SuiRawTxs: {
                    const { serializedTxs } = data as SuiRawTxsData
                    console.log("serializedTxs", serializedTxs)
                    break
                }
                default: {
                    throw new Error("Invalid transaction type")
                }
                }
                if (extraAction) {
                    await extraAction()
                }
                addTxHashToast(txHash)
            } catch (error) {
                addErrorToast((error as Error).message)
            } finally {
                toggle(false)
            }
        }
    )

    const renderContent = () => {
        switch (type) {
        case TransactionType.TransferToken: {
            const { tokenKey, amount, recipientAddress } =
          data as TransferTokenData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(TransferTokenContent)}
                    contentCallback={(item) => {
                        switch (item) {
                        case TransferTokenContent.Token: {
                            const token = tokens[tokenKey]?.[chainKey]?.[network]
                            if (!token) throw new Error("Token not found")
                            return (
                                <div className="flex items-center justify-between px-2 py-3 bg-content-2">
                                    <div className="text-sm font-semibold">Token</div>
                                    <div className="flex gap-2 items-center">
                                        <Image
                                            src={token.imageUrl || ""}
                                            className="rounded-none w-5 h-5"
                                        />
                                        <div className="text-sm">{token.name}</div>
                                    </div>
                                </div>
                            )
                        }
                        case TransferTokenContent.Amount: {
                            return (
                                <div className="flex items-center justify-between px-2 py-3 bg-content-2">
                                    <div className="text-sm font-semibold">Amount</div>
                                    <div className="flex gap-2 items-center">
                                        <div className="text-sm">{amount}</div>
                                    </div>
                                </div>
                            )
                        }
                        case TransferTokenContent.RecipientAddress: {
                            return (
                                <div className="flex items-center justify-between px-2 py-1 bg-content-2">
                                    <div className="text-sm font-semibold">
                        Recipient Address
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="text-sm">
                                            {truncateString(recipientAddress, 10, 4)}
                                        </div>
                                        <Snippet code={recipientAddress} />
                                    </div>
                                </div>
                            )
                        }
                        }
                    }}
                />
            )
        }
        case TransactionType.HoneycombProtocolRawTx: {
            const { txResponse } = data as HoneycombProtocolRawTxData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(HoneycombProtocolRawTxContent)}
                    contentCallback={(item) => {
                        switch (item) {
                        case HoneycombProtocolRawTxContent.SerializedTx: {
                            return (
                                <div className="flex items-center justify-between gap-12 p-3 bg-content-2">
                                    <div className="text-sm font-semibold">Serialized Tx</div>
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-2 items-center text-sm break-all whitespace-pre-wrap line-clamp-5">
                                            {truncateString(txResponse.transaction, 30, 4)}
                                        </div>
                                        <Snippet code={txResponse.transaction} />
                                    </div>
                                </div>
                            )
                        }
                        }
                    }}
                />
            )
        }
        case TransactionType.HoneycombProtocolRawTxs: {
            const { txResponses } = data as HoneycombProtocolRawTxsData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(HoneycombProtocolRawTxsContent)}
                    contentCallback={(item) => {
                        switch (item) {
                        case HoneycombProtocolRawTxsContent.SerializedTx: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-2 py-3 bg-content-2">
                                    <div className="text-sm font-semibold">
                        Serialized Txs
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-2 items-center text-sm break-all whitespace-pre-wrap line-clamp-5">
                                            {txResponses.transactions.map((transaction) => {
                                                return (
                                                    <div
                                                        className="flex gap-2 items-center"
                                                        key={transaction}
                                                    >
                                                        <div>{truncateString(transaction, 30, 4)}</div>
                                                        <Snippet code={transaction} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        }
                    }}
                />
            )
        }
        case TransactionType.SolanaRawTx: {
            const { serializedTx } = data as SolanaRawTxData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(SolanaRawTxContent)}
                    contentCallback={(item) => {
                        switch (item) {
                        case SolanaRawTxContent.SerializedTx: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-3 py-2 bg-content-2">
                                    <div className="text-sm font-semibold">Serialized Tx</div>
                                    <div className="flex gap-2 items-center">
                                        <div className="flex gap-2 items-center text-sm break-all whitespace-pre-wrap line-clamp-5">
                                            {truncateString(serializedTx, 30, 4)}
                                        </div>
                                        <Snippet code={serializedTx} />
                                    </div>
                                </div>
                            )
                        }
                        }
                    }}
                />
            )
        }
        case TransactionType.SolanaRawTxs: {
            const { serializedTxs } = data as SolanaRawTxsData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(SolanaRawTxsContent)}
                    contentCallback={(item) => {
                        switch (item) {
                        case SolanaRawTxsContent.SerializedTxs: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-3 py-2 bg-content-2">
                                    <div className="text-sm font-semibold">Serialized Txs</div>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            {serializedTxs.slice(0, 5).map((serializedTx) => {
                                                return (
                                                    <div key={serializedTx}>• {truncateString(serializedTx, 10, 4)}</div>
                                                )
                                            })}
                                        </div>
                                        <DownloadButton code={serializedTxs.join("\n")} filename={`${chainKey}-${network}-${type}-${Date.now()}.json`} />
                                    </div>           
                                </div>
                            )
                        }
                        }
                    }}
                />
            )
        }
        case TransactionType.SuiRawTx: {
            const { serializedTx } = data as SuiRawTxData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(SuiRawTxContent)}
                    contentCallback={(item) => {
                        switch (item) {
                        case SuiRawTxContent.SerializedTx: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-3 py-2 bg-content-2">
                                    <div className="text-sm font-semibold">Serialized Txs</div>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            {serializedTx}
                                        </div>
                                        <Snippet code={serializedTx} />
                                    </div>           
                                </div>
                            )
                        }
                        }
                    }}
                />
            )
        }
        case TransactionType.SuiRawTxs: {
            const { serializedTxs } = data as SuiRawTxsData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(SuiRawTxsContent)}
                    contentCallback={(item) => {
                        switch (item) {
                        case SuiRawTxsContent.SerializedTxs: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-3 py-2 bg-content-2">
                                    <div className="text-sm font-semibold">Serialized Txs</div>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            {serializedTxs.slice(0, 5).map((serializedTx) => {
                                                return (
                                                    <div key={serializedTx}>• {truncateString(serializedTx, 10, 4)}</div>
                                                )
                                            })}
                                        </div>
                                        <DownloadButton code={serializedTxs.join("\n")} filename={`${chainKey}-${network}-${type}-${Date.now()}.json`} />
                                    </div>           
                                </div>
                            )
                        }
                        }
                    }}
                />
            )
        }
        case TransactionType.TransferNFT: {
            const { nft, recipientAddress, collectionKey } =
          data as TransferNFTData
            return (
                <List
                    enableScroll={false}
                    items={Object.values(TransferNFTContent)}
                    contentCallback={(item) => {
                        const collection = collections[collectionKey]?.[network]
                        if (!collection) throw new Error("Collection not found")
                        switch (item) {
                        case TransferNFTContent.Collection: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-2 py-3 bg-content-2">
                                    <div className="text-sm font-semibold">Collection</div>
                                    <div className="flex gap-2 items-center">
                                        <Image
                                            src={collection.imageUrl}
                                            className="rounded-none w-5 h-5 object-contain"
                                        />
                                        <div className="text-sm">
                                            {collection.name}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        case TransferNFTContent.NFT: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-2 py-3 bg-content-2">
                                    <div className="text-sm font-semibold">NFT</div>
                                    <div className="flex gap-2 items-center">
                                        <Image 
                                            src={nft.image || ""}
                                            className="rounded-none w-5 h-5 object-contain"
                                        />
                                        <div className="text-sm">{nft.name}</div>
                                    </div>
                                </div>
                            )
                        }
                        case TransferNFTContent.RecipientAddress: {
                            return (
                                <div className="flex items-center justify-between gap-12 px-2 py-1 bg-content-2">
                                    <div className="text-sm font-semibold">
                        Recipient Address
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="text-sm">
                                            {truncateString(recipientAddress, 10, 4)}
                                        </div>
                                        <Snippet code={recipientAddress} />
                                    </div>
                                </div>
                            )
                        }
                        }           
                    }}
                />
            )
        }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader title="Sign Transaction" />
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="flex gap-2 items-center">
                        <Badge variant="secondary" className="flex gap-1">
                            <Image
                                src={blockchainMap[chainKey].imageUrl}
                                className="rounded-none w-4 h-4"
                            />
                            {blockchainMap[chainKey].name}
                        </Badge>
                        <Badge variant="secondary">{providers[type].name}</Badge>
                    </div>
                    <Spacer y={4} />
                    {renderContent()}
                </DialogBody>
                <DialogFooter className="w-full">
                    <ExtendedButton
                        variant="flat"
                        className="flex-1"
                        color="secondary"
                        onClick={() => toggle(false)}
                    >
            Cancel
                    </ExtendedButton>
                    <ExtendedButton
                        className="flex-1"
                        isLoading={isMutating}
                        onClick={() => trigger()}
                    >
            Sign
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export enum TransferTokenContent {
  Token = "token",
  Amount = "amount",
  RecipientAddress = "recipientAddress",
}

export enum TransferNFTContent {
  Collection = "collection",
  NFT = "nft",
  RecipientAddress = "recipientAddress",
}

export enum HoneycombProtocolRawTxContent {
  SerializedTx = "serializedTx",
}

export enum HoneycombProtocolRawTxsContent {
  SerializedTx = "serializedTxs",
}

export enum SolanaRawTxContent {
  SerializedTx = "serializedTx",
}

export enum SolanaRawTxsContent {
  SerializedTxs = "serializedTxs",
}

export enum SuiRawTxContent {
  SerializedTx = "serializedTx",
}

export enum SuiRawTxsContent {
  SerializedTxs = "serializedTxs",
}
