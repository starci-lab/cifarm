import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { TransferResult, transferNFT } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import { NFTCollectionKey } from "@/types"

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
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const collections = staticData?.nftCollections
    const umi = useAppSelector((state) => state.walletReducer.solanaWallet.umi)
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
                umi
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
