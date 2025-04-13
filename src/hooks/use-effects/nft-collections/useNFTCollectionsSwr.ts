import { CollectionResponse, getCollection } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "../../swr/types"

export interface UseNFTCollectionsSwrParams {
    //if collectionKey is set, collectionAddress is ignored
    collectionKey?: string
    //use collection address incase you want to get balance of a specific token
    collectionAddress?: string
}

export const useNFTCollectionsSwr = ({
    collectionAddress,
    collectionKey
}: UseNFTCollectionsSwrParams): UseSWR<CollectionResponse> => {
    //default values
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const accountId = useAppSelector((state) => state.sessionReducer.accounts.currentId)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const nftCollections = useAppSelector((state) => state.sessionReducer.nftCollections)
    const account = accounts.find((account) => account.id === accountId)
    //if tokenKey is set, tokenAddress is ignored
    const swr = useSWR(
        [chainKey, network, collectionAddress, collectionKey, account],
        async () => {
            if (!account) {
                return {
                    nfts: [],
                }
            }
            const { address } = account
            try {
                return await getCollection({
                    chainKey,
                    network,
                    collectionKey,
                    collectionAddress,
                    accountAddress: address,
                    collections: nftCollections,
                })
            } catch (error) {
                console.error(error)
                return {
                    nfts: [],
                }
            }
        }
    )

    return {
        swr,
    }
}