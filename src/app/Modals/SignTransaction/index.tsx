"use client"
import { HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION, SIGN_TRANSACTION_DISCLOSURE } from "@/app/constants"
import { truncateString } from "@/modules/common"
import { useSingletonHook } from "@/modules/singleton-hook"
import { TransactionFrom, useAppSelector } from "@/redux"
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
} from "@heroui/react"
import React, { FC } from "react"
import { TxResponse } from "@/modules/honeycomb"
import { ChainKey } from "@/modules/blockchain"
import { useHoneycombSendTransactionSwrMutation } from "@/hooks"

interface ProviderInfo {
  name: string;
  imageUrl: string;
}

export const SignTransactionModal: FC = () => {
    const { isOpen, onOpenChange, onClose } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_DISCLOSURE)

    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useHoneycombSendTransactionSwrMutation>
  >(HONEYCOMB_SEND_TRANSACTION_SWR_MUTATION)

    const serializedTx = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.serializedTx
    )
    const transactionFrom = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.transactionFrom
    )
    const data = useAppSelector(
        (state) => state.modalReducer.signTransactionModal.data
    )
    const extraAction = useAppSelector(
        state => state.modalReducer.signTransactionModal.extraAction
    )
    const { accounts, currentId } = useAppSelector((state) => state.sessionReducer.accounts)
    const account = accounts.find((account) => account.id === currentId)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    if (!account) return null   
    if (chainKey !== ChainKey.Solana) return null
    
    const providers: Record<TransactionFrom, ProviderInfo> = {
        [TransactionFrom.Base]: {
            name: "Base",
            imageUrl: "/base.svg",
        },
        [TransactionFrom.Honeycomb]: {
            name: "Honeycomb",
            imageUrl: "/honeycomb-protocol.svg",
        },
    }

    return (
        <Modal
            placement="bottom-center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                <ModalHeader>Sign Transaction</ModalHeader>
                <ModalBody>
                    <div>
                        <Chip
                            variant="flat"
                            color="primary"
                            startContent={
                                <Image
                                    src={providers[transactionFrom].imageUrl}
                                    className="w-5 h-5"
                                />
                            }
                        >
                            {providers[transactionFrom].name}
                        </Chip>
                        <Spacer y={4}/>
                        <div>
                            <div className="text-sm">Serialized Tx</div>
                            <Spacer y={1.5}/>
                            <Snippet hideSymbol codeString={serializedTx} className="max-w-full whitespace-pre-wrap" classNames={{
                                pre: "text-justify !break-all !whitespace-pre-line !line-clamp-5",
                            }}>
                                {truncateString(serializedTx, 60, 4)}
                            </Snippet>
                        </div>
                    </div>        
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="light"
                        onPress={onClose}
                        className="text-foreground-500"
                    >
            Cancel
                    </Button>
                    <Button
                        isLoading={swrMutation.isMutating}
                        color="primary"
                        className="light text-background"
                        onPress={async () => {
                            //close the current modal
                            if (transactionFrom === TransactionFrom.Honeycomb) {
                                const response = await swrMutation.trigger({
                                    transaction: data as TxResponse,
                                })
                                if (!response) {
                                    console.error("Failed to send transaction")
                                }
                                console.log(response)
                            }
                            // if (extraAction) {
                            //     await extraAction()
                            // }
                            onClose()
                        }}
                    >
            Sign
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
