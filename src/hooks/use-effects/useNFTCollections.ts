import { sessionDb } from "@/modules/dexie"
import {
    loadNFTCollections,
    StateNFTCollections,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { useEffect } from "react"
import _ from "lodash"

export const useNFTCollections = () => {
    const loadNFTCollectionsKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadNFTCollectionsKey
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts)

    const dispatch = useAppDispatch()

    useEffect(() => {
    //do nothing if loadTokensKey is equal to 0
        if (!loadNFTCollectionsKey && _.isEmpty(accounts)) return
        // fetch all tokens from IndexedDB, then load it to the redux store
        const handleEffect = async () => {
            //fetch all tokens from IndexedDB, then load it to the redux store
            const nftCollections = await sessionDb.nftCollections
                .filter(
                    (nftCollection) =>
                        nftCollection.chainKey === chainKey &&
            nftCollection.network === network
                )
                .toArray()
            //convert tokens to map
            const nftCollectionMap: StateNFTCollections = nftCollections.reduce(
                (nftCollections, nftCollection) => {
                    nftCollections[nftCollection.key] = {
                        placedItemTypeId: nftCollection.placedItemTypeId,
                        imageUrl: nftCollection.imageUrl,
                        name: nftCollection.name,
                        address: nftCollection.address,
                        enabled: nftCollection.enabled,
                    }
                    return nftCollections
                },
        {} as StateNFTCollections
            )
            //load tokens to redux store
            dispatch(loadNFTCollections(nftCollectionMap))
        }
        handleEffect()
    }, [loadNFTCollectionsKey, accounts])
}
