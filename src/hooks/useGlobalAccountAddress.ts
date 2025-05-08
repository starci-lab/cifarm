import { useAppSelector } from "@/redux"
import { useCurrentAccount } from "@mysten/dapp-kit"
import { useWallet } from "@solana/wallet-adapter-react"
import { ChainKey } from "@/modules/blockchain"

export const useGlobalAccountAddress = () => {
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const { publicKey: solanaWalletPublicKey } = useWallet()
    const suiWallet = useCurrentAccount()
    
    const getAddress = () => {
        if (chainKey === ChainKey.Solana) {
            return solanaWalletPublicKey?.toBase58()
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
