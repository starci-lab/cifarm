import { Network, solanaHttpRpcUrl } from "@/modules/blockchain"
import { useAppDispatch, useAppSelector, setUmi } from "@/redux"
import { ChainKey } from "@/types"
import { createUmi } from "@/utils"
import { useEffect } from "react"

export const useUpdateUmiEffects = () => {
    const dispatch = useAppDispatch()
    const signAllTransactions = useAppSelector(
        (state) => state.walletReducer.solanaWallet.signAllTransactions
    )
    const signTransaction = useAppSelector(
        (state) => state.walletReducer.solanaWallet.signTransaction
    )
    const signMessage = useAppSelector(
        (state) => state.walletReducer.solanaWallet.signMessage
    )
    const address = useAppSelector((state) => state.walletReducer.solanaWallet.address)
    useEffect(() => {
        if (
            !signAllTransactions ||
            !signTransaction ||
            !signMessage ||
            !address ||
            !dispatch
        ) {
            return
        }
        const umi = createUmi({
            walletParams: {
                address,
                signMessage,
                signTransaction,
                signAllTransactions,
            },
            rpcUrl: solanaHttpRpcUrl({
                chainKey: ChainKey.Solana,
                network: Network.Mainnet,
            }),
        })
        dispatch(setUmi(umi))
    }, [
        signAllTransactions,
        signTransaction,
        signMessage,
        address,
        dispatch,
    ])
}
