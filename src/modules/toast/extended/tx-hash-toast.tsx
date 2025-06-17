import { toast } from "../useToast"
import { ChainKey, Network, explorerUrl } from "@/modules/blockchain"
import { Link } from "@/components"
import { truncateString } from "@/utils"
import React from "react"

export interface AddTxHashToastParams {
  txHash: string;
  chainKey: ChainKey;
  network: Network;
}

const DURATION = 10000 // 10s
export const addTxHashToast = ({
    txHash,
    chainKey,
    network,
}: AddTxHashToastParams) =>
    toast({
        duration: DURATION,
        title: "Transaction receipt",
        description: (
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
            </Link>
        ),
        variant: "default",
    })
