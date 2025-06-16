import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { ChainKey, TransferResult, transferNFT } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/(core)/constants"
import { NFTCollectionKey } from "@/modules/entities"

export interface UseTransferNFTSwrMutationArgs {
    nftAddress: string
    recipientAddress: string
    collectionKey: NFTCollectionKey
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
    const wallet = useAppSelector((state) => state.walletReducer[ChainKey.Solana])
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
                wallet
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
