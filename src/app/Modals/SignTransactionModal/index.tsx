"use client"
import {
    HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_NFT_SWR_MUTATION,
    TRANSFER_TOKEN_SWR_MUTATION,
} from "@/app/constants"
import { truncateString } from "@/modules/common"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Image, List, Snippet, Spacer } from "@/components"
import {
    HoneycombProtocolRawTxData,
    TransactionType,
    TransferNFTData,
    TransferTokenData,
    useAppSelector,
} from "@/redux"
import React, { FC } from "react"
import { blockchainMap, explorerUrl } from "@/modules/blockchain"
import { useHoneycombSendTransactionSwrMutation, useTransferNFTSwrMutation, useTransferTokenSwrMutation } from "@/hooks"
import useSWRMutation from "swr/mutation"
import { ExtendedButton, ModalHeader } from "@/components"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks"
import { useDisclosure } from "react-use-disclosure"
import { sessionDb, SessionDbKey } from "@/modules/dexie"

interface ProviderInfo {
  name: string;
}

export const SignTransactionModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_DISCLOSURE)
  
    const { swrMutation: honeycombSendTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useHoneycombSendTransactionSwrMutation>
  >(HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION)

    const { swrMutation: transferTokenSwrMutation } = useSingletonHook<
    ReturnType<typeof useTransferTokenSwrMutation>
  >(TRANSFER_TOKEN_SWR_MUTATION)

    const { swrMutation: transferNFTSwrMutation } = useSingletonHook<
    ReturnType<typeof useTransferNFTSwrMutation>
  >(TRANSFER_NFT_SWR_MUTATION)

    const type = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.type
    )
    const data = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.data
    )
    const extraAction = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.extraAction
    )

    const network = useAppSelector((state) => state.sessionReducer.network)

    const { toast } = useToast()

    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const currentAccountId = useAppSelector((state) => state.sessionReducer.accounts.currentId)
    const account = accounts.find((account) => account.id === currentAccountId)

    const addTxHashToast = (txHash: string) => toast({
        title: "Tx hash",
        description: truncateString(txHash, 10, 4),
        action: <ExtendedButton variant="outline" onClick={() => {
            window.open(explorerUrl({
                chainKey,
                network,
                value: txHash,
                type: "tx",
            }), "_blank")
        }}>
            View
        </ExtendedButton>,
        variant: "default",
    })
    
    const addErrorToast = () => toast({
        title: "Error",
        description: "Failed to sign transaction",
        variant: "destructive",
    })

    const balanceSwrs = useAppSelector((state) => state.sessionReducer.balanceSwrs)
    const collections = useAppSelector((state) => state.sessionReducer.nftCollections)

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
                        transaction: txResponse
                    })
                    if (!response) throw new Error("Failed to send transaction")
                    if (response.error) { throw new Error(response.error) }
                    txHash = response.signature?.toString() ?? ""
                    // clear the data in session db
                    await sessionDb.keyValueStore.delete(SessionDbKey.HoneycombDailyRewardTransaction)
                    break
                }
                case TransactionType.TransferToken: {
                    const { tokenKey, amount, recipientAddress } = data as TransferTokenData
                    const { txHash: txHashResponse } = await transferTokenSwrMutation.trigger({
                        amount,
                        tokenKey,
                        recipientAddress,
                    })
                    txHash = txHashResponse
                    
                    await balanceSwrs[tokenKey].mutate()

                    break
                } 
                case TransactionType.TransferNFT: {
                    const { nft, recipientAddress, collectionKey } = data as TransferNFTData
                    const { txHash: txHashResponse } = await transferNFTSwrMutation.trigger({
                        nftAddress: nft.nftAddress,
                        recipientAddress,
                        collectionKey,
                    })
                    txHash = txHashResponse
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
                console.log(error)
                addErrorToast()
            } finally {
                toggle(false)
            }
        }
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    if (!account) return null

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
    }

    const renderContent = () => {
        switch (type) {
        case TransactionType.TransferToken: {
            const { tokenKey, amount, recipientAddress } =
          data as TransferTokenData
            return (
                <List items={Object.values(TransferTokenContent)} contentCallback={(item) => {
                    switch (item) {
                    case TransferTokenContent.Token: {
                        return (
                            <div className="flex items-center justify-between px-2 py-3">
                                <div className="text-sm font-semibold">Token</div>
                                <div className="flex gap-2 items-center">
                                    <Image 
                                        src={tokens[tokenKey].imageUrl} 
                                        className="rounded-none w-5 h-5" 
                                    />
                                    <div className="text-sm">{tokens[tokenKey].name}</div>
                                </div>
                            </div>
                        )   
                    }
                    case TransferTokenContent.Amount: {
                        return (
                            <div className="flex items-center justify-between px-2 py-3">
                                <div className="text-sm font-semibold">Amount</div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">{amount}</div>
                                </div>
                            </div>
                        )
                    }
                    case TransferTokenContent.RecipientAddress: {
                        return (
                            <div className="flex items-center justify-between px-2 py-3">
                                <div className="text-sm font-semibold">Recipient Address</div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">{truncateString(recipientAddress, 10,4)}</div>
                                    <Snippet code={recipientAddress} />
                                </div>
                            </div>
                        )
                    }
                    }
                }
                }/>)}
        case TransactionType.HoneycombProtocolRawTx: {
            const { txResponse } = data as HoneycombProtocolRawTxData
            return (
                <List items={Object.values(HoneycombProtocolRawTxContent)} contentCallback={(item) => {
                    switch (item) {
                    case HoneycombProtocolRawTxContent.SerializedTx: {
                        return (
                            <div className="flex items-center justify-between gap-12 px-2 py-3">
                                <div className="text-sm font-semibold">Serialized Tx</div>
                                <div className="flex gap-2 items-center">
                                    <div className="flex gap-2 items-center text-sm break-all whitespace-pre-wrap line-clamp-5">
                                        {truncateString(txResponse.transaction, 40, 4)}
                                    </div>
                                    <Snippet code={txResponse.transaction} /> 
                                </div>
                            </div>
                        )
                    }
                    }
                }}/>
            )
        }
        case TransactionType.TransferNFT: {
            const { nft, recipientAddress, collectionKey } = data as TransferNFTData
            return (
                <List items={Object.values(TransferNFTContent)} contentCallback={(item) => {
                    switch (item) {
                    case TransferNFTContent.Collection: {
                        return (
                            <div className="flex items-center justify-between gap-12 px-2 py-3">
                                <div className="text-sm font-semibold">Collection</div>
                                <div className="flex gap-2 items-center">
                                    <Image 
                                        src={collections[collectionKey].imageUrl} 
                                        className="rounded-none w-5 h-5 object-contain" 
                                    />  
                                    <div className="text-sm">{collections[collectionKey].name}</div>
                                </div>
                            </div>
                        )
                    }
                    case TransferNFTContent.NFT: {
                        return (
                            <div className="flex items-center justify-between gap-12 px-2 py-3">
                                <div className="text-sm font-semibold">NFT</div>
                                <div className="flex gap-2 items-center">
                                    <Image 
                                        src={nft.imageUrl} 
                                        className="rounded-none w-5 h-5 object-contain" 
                                    />  
                                    <div className="text-sm">{nft.name}</div>
                                </div>
                            </div>
                        )
                    }
                    case TransferNFTContent.RecipientAddress: {
                        return (
                            <div className="flex items-center justify-between gap-12 px-2 py-3">
                                <div className="text-sm font-semibold">Recipient Address</div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">{truncateString(recipientAddress, 10,4)}</div>
                                    <Snippet code={recipientAddress} />
                                </div>
                            </div>
                        )
                    }
                    }
                }}/>
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
                <div>
                    <div className="flex gap-2 items-center">
                        <Badge variant="secondary" className="flex gap-1">
                            <Image
                                src={blockchainMap[chainKey].imageUrl}
                                className="rounded-none w-4 h-4"
                            />
                            {blockchainMap[chainKey].name}
                        </Badge>
                        <Badge variant="secondary">
                            {providers[type].name}
                        </Badge>
                    </div>
                    <Spacer y={4} />
                    {renderContent()}
                </div>
                <DialogFooter className="w-full">
                    <ExtendedButton
                        variant="ghost"
                        onClick={() => toggle(false)}
                        className="text-muted-foreground w-full"
                    >
                        Cancel
                    </ExtendedButton>
                    <ExtendedButton
                        className="w-full"
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
