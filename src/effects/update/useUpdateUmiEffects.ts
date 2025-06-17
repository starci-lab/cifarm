import { Network, solanaHttpRpcUrl } from "@/modules/blockchain"
import { useAppDispatch, useAppSelector, setUmi } from "@/redux"
import { ChainKey } from "@/types"
import { createUmi } from "@/utils"
import { useEffect } from "react"

export const useUpdateUmiEffects = () => {
    const dispatch = useAppDispatch()
    const signAllTransactions = useAppSelector(
        (state) => state.solanaWalletReducer.signAllTransactions
    )
    const signTransaction = useAppSelector(
        (state) => state.solanaWalletReducer.signTransaction
    )
    const signMessage = useAppSelector(
        (state) => state.solanaWalletReducer.signMessage
    )
    const address = useAppSelector((state) => state.solanaWalletReducer.address)
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
