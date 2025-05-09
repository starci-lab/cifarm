import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { TransferResult, transferNFT } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { NFTType } from "@/modules/entities"
import { useWallet } from "@solana/wallet-adapter-react"

export interface UseTransferNFTSwrMutationArgs {
    nftAddress: string
    recipientAddress: string
    collectionKey: NFTType
}

export const useTransferNFTSwrMutation = (): UseSWRMutation<
  TransferResult,
  UseTransferNFTSwrMutationArgs
> => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const { swr: swrStatic } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )
    const collections = swrStatic.data?.data.nftCollections
    const walletAdapter = useWallet()
    const swrMutation = useSWRMutation(
        "TRANSFER_NFT",
        async (
            _: string,
            extraArgs: { arg: UseTransferNFTSwrMutationArgs }
        ) => {
            if (!collections) throw new Error("Collections not found")
            const { nftAddress, recipientAddress, collectionKey } = { ...extraArgs.arg }
            return await transferNFT({
                nftAddress,
                recipientAddress,
                chainKey,
                collectionKey,
                collections,
                walletAdapter
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
