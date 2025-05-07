import {
    ChainKey,
    CollectionResponse,
    getCollection,
} from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import useSWR from "swr"
import { UseSWR } from "../../swr/types"
import { envConfig } from "@/env"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import { valuesWithKey } from "@/modules/common"
import { useWallet } from "@solana/wallet-adapter-react"
import { useCurrentAccount } from "@mysten/dapp-kit"

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
        (state) => state.sidebarReducer.assetsChainKey
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
    const { publicKey: solanaPublicKey } = useWallet()
    const suiWalletAccount = useCurrentAccount()
    //if tokenKey is set, tokenAddress is ignored
    const swr = useSWR(
        [
            chainKey,
            network,
            collectionAddress,
            collectionKey,
            refreshNFTCollectionsKey,
            solanaPublicKey,
        ],
        async () => {
            if (!nftCollection) {
                return {
                    nfts: [],
                }
            }
            let accountAddress: string
            switch (chainKey) {
            case ChainKey.Sui:
                accountAddress = suiWalletAccount?.address || ""
                break
            case ChainKey.Solana:
                accountAddress = solanaPublicKey?.toBase58() || ""
                break
            default:
                throw new Error("Invalid chain key")
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
