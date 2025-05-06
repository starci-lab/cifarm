import { sessionDb } from "@/modules/dexie"
import {
    loadNFTCollections,
    StateNFTCollections,
    updateNFTCollection,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { useEffect, useRef, useState } from "react"
import _ from "lodash"
import { defaultChainKey, defaultNetwork, blockchainMap } from "@/modules/blockchain"

export const useNFTCollections = () => {
    const loadNFTCollectionsKey = useAppSelector(
        (state) => state.hookDependencyReducer.loadNFTCollectionsKey
    )
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const accounts = useAppSelector((state) => state.sessionReducer.accounts.accounts)
    const accountsLoaded = useAppSelector((state) => state.sessionReducer.accountsLoaded)
    const nftCollections = useAppSelector(
        (state) => state.sessionReducer.nftCollections
    )
    const dispatch = useAppDispatch()
    const [nftCollectionsLoaded, setNftCollectionsLoaded] = useState(false)
    useEffect(() => {
    //do nothing if loadTokensKey is equal to 0
        if (!loadNFTCollectionsKey && !accountsLoaded) return
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

            const defaultNFTCollections = Object.entries(
                blockchainMap[defaultChainKey].defaultCollections[defaultNetwork]
            ).reduce((collections, [key, collection]) => {
                collections[key] = {
                    ...collection,
                    enabled: true,
                    version: collection.version ?? 0,
                }
                return collections
            }, {} as StateNFTCollections)

            // check if any deleted keys
            const deletedKeys = Object.keys(defaultNFTCollections).filter(
                (key) =>
                    !nftCollections.find((nftCollection) => nftCollection.key === key)
            )
            if (deletedKeys.length > 0) {
                // remove deleted keys
                await sessionDb.nftCollections.bulkDelete(
                    deletedKeys.map(
                        (key) =>
                            nftCollections.find((nftCollection) => nftCollection.key === key)
                                ?.id ?? 0
                    )
                )
            }
            // check if any additional keys
            const additionalKeys = Object.keys(defaultNFTCollections).filter(
                (key) =>
                    !nftCollections.find((nftCollection) => nftCollection.key === key)
            )
            if (additionalKeys.length > 0) {
                // add missing keys
                await sessionDb.nftCollections.bulkAdd(
                    additionalKeys.map((key) => ({
                        ...defaultNFTCollections[key],
                        chainKey,
                        network,
                        key,
                        version: defaultNFTCollections[key].version ?? 0,
                    }))
                )
            }
            // check if any updated version
            for (const nftCollection of nftCollections) {
                if (
                    nftCollection.version !==
          defaultNFTCollections[nftCollection.key].version
                ) {
                    const updatedNFTCollection = {
                        ...defaultNFTCollections[nftCollection.key],
                        id: nftCollection.id,
                        chainKey,
                        network,
                        key: nftCollection.key,
                        version: defaultNFTCollections[nftCollection.key].version ?? 0,
                    }
                    // update version
                    await sessionDb.nftCollections.put(updatedNFTCollection)
                }
            }
            // refresh nft collections, to ensure the latest version
            const _nftCollections = await sessionDb.nftCollections
                .filter(
                    (nftCollection) =>
                        nftCollection.chainKey === chainKey &&
            nftCollection.network === network
                )
                .toArray()
            //convert tokens to map
            const nftCollectionMap: StateNFTCollections = _nftCollections.reduce(
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
            setNftCollectionsLoaded(true)
        }
        handleEffect()
    }, [loadNFTCollectionsKey, accounts])

    // migration in case the default tokens show 
    const migrationOccured = useRef(false)  
    useEffect(() => {
        if (!nftCollectionsLoaded) return
        if (migrationOccured.current) return
        migrationOccured.current = true
        const handleEffect = async () => {
            const defaultNFTCollections = Object.entries(
                blockchainMap[defaultChainKey].defaultCollections[defaultNetwork]
            ).reduce((collections, [key, collection]) => {
                collections[key] = { ...collection, enabled: true }
                return collections
            }, {} as StateNFTCollections)
            // check if any additional keys
            const additionalKeys = Object.keys(defaultNFTCollections).filter(
                (key) => !nftCollections[key]
            )
            if (additionalKeys.length > 0) {
                // add missing keys
                await sessionDb.nftCollections.bulkAdd(
                    additionalKeys.map((key) => ({
                        ...defaultNFTCollections[key],
                        chainKey,
                        network,
                        key,
                        version: defaultNFTCollections[key].version ?? 0,
                    }))
                )
                // update redux store
                dispatch(loadNFTCollections(defaultNFTCollections))
            }
            // check if any deleted keys
            const deletedKeys = Object.keys(nftCollections).filter(
                (key) => !defaultNFTCollections[key]
            )
            if (deletedKeys.length > 0) {
                // update redux store
                dispatch(loadNFTCollections(defaultNFTCollections))
            }
            // check if any changes between defaultNFTCollections and nftCollections
            for (const key in defaultNFTCollections) {
                if (!_.isEqual(defaultNFTCollections[key], nftCollections[key])) {
                    // update redux store
                    const nftCollection = await sessionDb.nftCollections.filter(
                        (nftCollection) => nftCollection.key === key
                    ).first()
                    if (!nftCollection) {
                        throw new Error(`NFT collection ${key} not found`)
                    }
                    await sessionDb.nftCollections.put({
                        ...nftCollection,
                        ...defaultNFTCollections[key],
                    })
                    dispatch(updateNFTCollection({
                        key,
                        collection: defaultNFTCollections[key]
                    }))
                }
            }
        }
        handleEffect()
    }, [nftCollectionsLoaded, nftCollections])
}
