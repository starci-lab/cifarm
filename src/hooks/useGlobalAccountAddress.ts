import { useAppSelector } from "@/redux"
import { ChainKey } from "@/types"

export const useGlobalAccountAddress = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const solanaWalletAddress = useAppSelector(state => state.walletReducer.solanaWallet.address)
    
    const getAddress = () => {
        if (chainKey === ChainKey.Solana) {
            return solanaWalletAddress
        }
        return undefined
    }
    return {

        accountAddress: getAddress(),
    }
}
