import {
    CollectionResponse,
    getCollection,
} from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "../../swr/types"
import { envConfig } from "@/env"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGlobalAccountAddress, useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { valuesWithKey } from "@/modules/common"

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
    const chainKey = useAppSelector(
        (state) => state.sessionReducer.chainKey
    )
    const network = envConfig().network
    const { swr: staticData } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const nftCollections = valuesWithKey(
        staticData.data?.data.nftCollections || {}
    )
    const nftCollection = nftCollections.find(
        (nftCollection) => nftCollection.key === collectionKey
    )
    const refreshNFTCollectionsKey = useAppSelector(
        (state) => state.hookDependencyReducer.refreshNFTCollectionsKey
    )

    const { accountAddress } = useGlobalAccountAddress()
    //if tokenKey is set, tokenAddress is ignored
    const swr = useSWR(
        [
            chainKey,
            network,
            collectionAddress,
            collectionKey,
            refreshNFTCollectionsKey,
            accountAddress,
        ],
        async () => {
            if (!nftCollection || !accountAddress) {
                return {
                    nfts: [],
                }
            }
            try {
                return await getCollection({
                    chainKey,
                    network,
                    accountAddress: accountAddress,
                    collectionKey: nftCollection.key,
                    collectionAddress,
                    collections: staticData.data?.data.nftCollections,
                })
            } catch (error) {
                console.log(error)
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
