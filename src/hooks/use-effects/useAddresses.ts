import { sessionDb } from "@/modules/dexie/session/db"
import { setAddresses, useAppSelector, useAppDispatch } from "@/redux"
import { useEffect } from "react"

export const useAddresses = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)
    const dispatch = useAppDispatch()
    const refreshAddressesKey = useAppSelector(
        (state) => state.hookDependencyReducer.refreshAddressesKey
    )
    useEffect(() => {
        const handleEffect = async () => {
            const addresses = await sessionDb.addresses.filter(
                (address) => address.chainKey === chainKey && address.network === network
            ).sortBy("index")
            dispatch(setAddresses(addresses.map((address) => address.address)))
        }
        handleEffect()
    }, [chainKey, network, refreshAddressesKey])
}
