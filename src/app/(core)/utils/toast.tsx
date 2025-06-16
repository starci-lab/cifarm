import { toast } from "@/hooks"
import { ChainKey, explorerUrl, Network } from "@/modules/blockchain"
import { Link } from "@/components"
import { truncateString } from "@/modules/common"
import React from "react"

export interface TxHashToastProps {
    txHash: string
    chainKey: ChainKey
    network: Network
}

const TX_HAST_DURATION = 1000
export const addTxHashToast = ({ txHash, chainKey, network }: TxHashToastProps) =>
    toast({
        duration: TX_HAST_DURATION,
        title: "Transaction receipt",
        description:
        <Link
            href={explorerUrl({
                chainKey,
                network,
                value: txHash,
                type: "tx",
            })}
            target="_blank"
            color="success"
        >
            {truncateString(txHash, 10, 4)}
        </Link>,
        variant: "default",
    })
    