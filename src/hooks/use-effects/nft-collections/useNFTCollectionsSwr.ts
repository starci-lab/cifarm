import { CollectionResponse, getCollection, NFTData } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "../../swr/types"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_NFTS_VALIDATED_SWR_MUTATION } from "@/app/constants"
import { useGraphQLQueryNFTsValidatedSwrMutation } from "@/hooks"

export interface UseNFTCollectionsSwrParams {
  //if collectionKey is set, collectionAddress is ignored
  collectionKey?: string;
  //use collection address incase you want to get balance of a specific token
  collectionAddress?: string;
}

export const useNFTCollectionsSwr = ({
    collectionAddress,
    collectionKey,
}: UseNFTCollectionsSwrParams): UseSWR<CollectionResponse> => {
    //default values
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const accountId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const nftCollections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const account = accounts.find((account) => account.id === accountId)
    const { swrMutation: nftsValidatedSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryNFTsValidatedSwrMutation>
  >(GRAPHQL_QUERY_NFTS_VALIDATED_SWR_MUTATION)

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
                const collection = await getCollection({
                    chainKey,
                    network,
                    collectionKey,
                    collectionAddress,
                    accountAddress: address,
                    collections: nftCollections,
                })
                const { data: nftsValidated } = await nftsValidatedSwr.trigger({
                    request: {
                        nftAddresses: collection.nfts.map((nft) => nft.nftAddress),
                    },
                })
                const _nfts: Array<NFTData> = collection.nfts.map((nft) => {
                    const nftValidated = nftsValidated?.nftsValidated.some(
                        (nftValidated) => {
                            return (
                                nftValidated.nftAddress === nft.nftAddress
                                && nftValidated.validated
                            )
                        }
                    )
                    return {
                        ...nft,
                        validated: nftValidated
                    }
                })
                return {
                    ...collection,
                    nfts: _nfts,
                }
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
