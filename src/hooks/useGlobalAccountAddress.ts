import { useAppSelector } from "@/redux"
import { useCurrentAccount } from "@mysten/dapp-kit"
import { ChainKey } from "@/modules/blockchain"

export const useGlobalAccountAddress = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const { address: solanaWalletAddress } = useAppSelector(state => state.walletReducer[ChainKey.Solana])
    const suiWallet = useCurrentAccount()
    
    const getAddress = () => {
        if (chainKey === ChainKey.Solana) {
            return solanaWalletAddress
        }
        if (chainKey === ChainKey.Sui) {
            return suiWallet?.address
        }
        return undefined
    }
    return {
        accountAddress: getAddress(),
    }
}
