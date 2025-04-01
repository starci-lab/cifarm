"use client"
import {
    HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_DISCLOSURE,
    TRANSFER_TOKEN_SWR_MUTATION,
} from "@/app/constants"
import { truncateString } from "@/modules/common"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Image, Snippet, Spacer } from "@/components"
import {
    HoneycombProtocolRawTxData,
    TransactionType,
    TransferTokenData,
    useAppSelector,
} from "@/redux"
import React, { FC } from "react"
import { blockchainMap, explorerUrl } from "@/modules/blockchain"
import { useHoneycombSendTransactionSwrMutation, useTransferTokenSwrMutation } from "@/hooks"
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
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
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

    const balances = useAppSelector((state) => state.sessionReducer.balances)
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
                                    className="rounded-none w-5 h-5" 
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
                                <div className="text-sm">{truncateString(recipientAddress, 15,4)}</div>
                                <Snippet code={recipientAddress} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )
        }
        case TransactionType.HoneycombProtocolRawTx: {
            const { txResponse } = data as HoneycombProtocolRawTxData
            return (
                <Card>
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between gap-12">
                            <div className="text-sm font-semibold">Serialized Tx</div>
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-2 items-center text-sm break-all whitespace-pre-wrap line-clamp-5">
                                    {truncateString(txResponse.transaction, 40, 4)}
                                </div>
                                <Snippet code={txResponse.transaction} /> 
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
                <DialogFooter>
                    <ExtendedButton
                        variant="ghost"
                        onClick={() => toggle(false)}
                        className="text-muted-foreground"
                    >
                        Cancel
                    </ExtendedButton>
                    <ExtendedButton
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
