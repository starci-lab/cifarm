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
import {
    Button,
    Chip,
    Snippet,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
    Card,
    Divider,
    CardBody,
    addToast,
} from "@heroui/react"
import React, { FC } from "react"
import { blockchainMap } from "@/modules/blockchain"
import { useHoneycombSendTransactionSwrMutation, useTransferTokenSwrMutation } from "@/hooks"
import { CopyText, Title } from "@/components"
import useSWRMutation from "swr/mutation"

interface ProviderInfo {
  name: string;
}

export const addTxHashToast = (txHash: string) => addToast({
    title: "Tx Hash",
    description: truncateString(txHash, 40, 4),
    color: "success",
})

export const addErrorToast = () => addToast({
    title: "Error",
    description: "Failed to sign transaction",
    color: "danger",
})

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
                    <CardBody className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Token</div>
                            <div className="flex gap-2 items-center">
                                <Image radius="none" src={tokens[tokenKey].imageUrl} alt={tokens[tokenKey].name} className="w-5 h-5" />
                                <div className="text-sm">{tokens[tokenKey].name}</div>
                            </div>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardBody className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Amount</div>
                            <div className="flex gap-2 items-center">
                                <div className="text-sm">{amount}</div>
                            </div>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardBody className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">Recipient Address</div>
                            <div className="flex gap-2 items-center">
                                <CopyText text={truncateString(recipientAddress, 15,4)} copyString={recipientAddress} />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )
        }
        case TransactionType.HoneycombProtocolRawTx: {
            const { serializedTx } = data as HoneycombProtocolRawTxData
            return (
                <div>
                    <Title
                        title="Serialized Tx"
                        tooltipString="Serialized Tx is the raw transaction data that will be sent to the blockchain. It is a hex string that represents the transaction data."
                    />
                    <Spacer y={1.5} />
                    <Snippet
                        hideSymbol
                        codeString={serializedTx}
                        className="max-w-full whitespace-pre-wrap"
                        classNames={{
                            pre: "text-justify !break-all !whitespace-pre-line !line-clamp-5",
                        }}
                    >
                        {truncateString(serializedTx, 60, 4)}
                    </Snippet>
                </div>
            )
        }
        }
    }

    return (
        <Modal placement="bottom" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <div className="text-lg font-bold">Sign Transaction</div>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="flex gap-2 items-center">
                            <Chip
                                classNames={{
                                    content: "pr-0",
                                }}
                                className="px-2 flex-1 sm:flex-none sm:w-1/2"
                                startContent={
                                    <Image
                                        radius="none"
                                        className="w-5 h-5"
                                        removeWrapper
                                        src={blockchainMap[chainKey].imageUrl}
                                    />
                                }
                                variant="flat"
                                color="primary"
                            >
                                {blockchainMap[chainKey].name}
                            </Chip>
                            <Chip variant="flat" color="primary">
                                {providers[type].name}
                            </Chip>
                        </div>
                        <Spacer y={4} />
                        {renderContent()}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={onClose}
                        className="text-foreground-400"
                    >
            Cancel
                    </Button>
                    <Button
                        isLoading={isMutating}
                        color="primary"
                        className="light text-background"
                        onPress={async () => {
                            await trigger()
                        }}
                    >
            Sign
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
