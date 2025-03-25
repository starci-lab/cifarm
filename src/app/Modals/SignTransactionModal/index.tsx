"use client"
import {
    HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_TOKEN_SWR_MUTATION,
} from "@/app/constants"
import { truncateString } from "@/modules/common"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    HoneycombProtocolRawTxData,
    TransactionType,
    TransferTokenData,
    useAppSelector,
} from "@/redux"
import React, { FC } from "react"
import { blockchainMap, explorerUrl } from "@/modules/blockchain"
import { useHoneycombSendTransactionSwrMutation, useTransferTokenSwrMutation } from "@/hooks"
import { CopyText, Title } from "@/components"
import useSWRMutation from "swr/mutation"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useDisclosure } from "@/hooks"
import Image from "next/image"
import Link from "next/link"

interface ProviderInfo {
  name: string;
}

export const SignTransactionModal: FC = () => {
    const { isOpen, onOpenChange, onClose } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_DISCLOSURE)

    const { swrMutation: honeycombSendTransactionSwrMutation } = useSingletonHook<
    ReturnType<typeof useHoneycombSendTransactionSwrMutation>
  >(HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION)

    const { swrMutation: transferTokenSwrMutation } = useSingletonHook<
    ReturnType<typeof useTransferTokenSwrMutation>
  >(TRANSFER_TOKEN_SWR_MUTATION)

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

    const addTxHashToast = (txHash: string) => toast({
        title: "Tx Hash",
        description: (
            <Link 
                href={explorerUrl({
                    chainKey,
                    network,
                    value: txHash,
                    type: "tx",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
            >
                {truncateString(txHash, 10, 4)} ↗
            </Link>
        ),
        variant: "default",
    })
    
    const addErrorToast = () => toast({
        title: "Error",
        description: "Failed to sign transaction",
        variant: "destructive",
    })

    const balances = useAppSelector((state) => state.sessionReducer.balances)
    

    const { trigger, isMutating } = useSWRMutation(
        "SIGN_TRANSACTION",
        async () => {
            try {
                let txHash = ""
                switch (type) {
                case TransactionType.HoneycombProtocolRawTx: {
                    //return await honeycombSendTransactionSwrMutation.trigger(data)
                    console.log(honeycombSendTransactionSwrMutation)
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
                    
                    await balances[tokenKey].mutate()

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
                onClose()
            }
        }
    )

    const { accounts, currentId } = useAppSelector(
        (state) => state.sessionReducer.accounts
    )
    const account = accounts.find((account) => account.id === currentId)
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
    }

    const renderContent = () => {
        switch (type) {
        case TransactionType.TransferToken: {
            const { tokenKey, amount, recipientAddress } =
          data as TransferTokenData
            return (
                <Card>
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Token</div>
                            <div className="flex gap-2 items-center">
                                <Image 
                                    src={tokens[tokenKey].imageUrl} 
                                    alt={tokens[tokenKey].name} 
                                    width={20} 
                                    height={20}
                                    className="rounded-none" 
                                />
                                <div className="text-sm">{tokens[tokenKey].name}</div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator />
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Amount</div>
                            <div className="flex gap-2 items-center">
                                <div className="text-sm">{amount}</div>
                            </div>
                        </div>
                    </CardContent>
                    <Separator />
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Recipient Address</div>
                            <div className="flex gap-2 items-center">
                                <CopyText text={truncateString(recipientAddress, 15,4)} copyString={recipientAddress} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )
        }
        case TransactionType.HoneycombProtocolRawTx: {
            const { serializedTx } = data as HoneycombProtocolRawTxData
            return (
                <div className="space-y-4">
                    <Title
                        title="Serialized Tx"
                        tooltipString="Serialized Tx is the raw transaction data that will be sent to the blockchain. It is a hex string that represents the transaction data."
                    />
                    <code className="block w-full p-2 bg-muted rounded-md text-sm break-all whitespace-pre-wrap line-clamp-5">
                        {truncateString(serializedTx, 60, 4)}
                    </code>
                </div>
            )
        }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Sign Transaction</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex gap-2 items-center">
                        <Badge variant="secondary" className="px-2 flex-1 sm:flex-none sm:w-1/2 flex items-center gap-2">
                            <Image
                                src={blockchainMap[chainKey].imageUrl}
                                alt={blockchainMap[chainKey].name}
                                width={20}
                                height={20}
                                className="rounded-none"
                            />
                            {blockchainMap[chainKey].name}
                        </Badge>
                        <Badge variant="secondary">
                            {providers[type].name}
                        </Badge>
                    </div>
                    {renderContent()}
                </div>
                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => trigger()}
                        disabled={isMutating}
                    >
                        Sign
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
