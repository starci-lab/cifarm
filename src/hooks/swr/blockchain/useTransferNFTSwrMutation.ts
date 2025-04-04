import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { TransferResult, transferNFT } from "@/modules/blockchain"

export interface UseTransferNFTSwrMutationArgs {
    nftAddress: string
    recipientAddress: string
    collectionKey: string
}

export const useTransferNFTSwrMutation = (): UseSWRMutation<
  TransferResult,
  UseTransferNFTSwrMutationArgs
> => {
    //get accounts
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const collections = useAppSelector((state) => state.sessionReducer.nftCollections)
    
    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseTransferNFTSwrMutationArgs }
        ) => {
            const { nftAddress, recipientAddress, collectionKey } = { ...extraArgs.arg }
            if (!account) throw new Error("No account found")
            
            return await transferNFT({
                nftAddress,
                recipientAddress,
                chainKey,
                network,
                privateKey: account?.privateKey,
                collectionKey,
                collections,
            })            
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
