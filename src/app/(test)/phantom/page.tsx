"use client"
import { useAppSelector } from "@/redux"
import { ChainKey } from "@/modules/blockchain"
import React from "react"
import { publicKey, sol } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { TransactionBuilder } from "@metaplex-foundation/umi"
import { transferSol } from "@metaplex-foundation/mpl-toolbox"
import { umiWalletAdapterIdentity } from "@/modules/blockchain"
import bs58 from "bs58"

const Page = () => {
    const connect = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.connect)
    const disconnect = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.disconnect)
    const signMessage = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.signMessage)
    const phantom = useAppSelector(state => state.walletReducer[ChainKey.Solana])
    const signedTransaction = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.signedTransaction)
    const signedTransactions = useAppSelector(state => state.walletReducer[ChainKey.Solana]?.signedTransactions)

    return <>
        <div>
            <div>{signedTransaction?.toString()}</div>
            <div>{signedTransactions?.join("\n")}</div>
            <div>{phantom.address}</div>
            <button onClick={() => connect?.()}>Connect</button>
            <button onClick={() => disconnect?.()}>Disconnect</button>
            <button onClick={() => signMessage?.(Buffer.from("Hello"))}>Sign Message</button>
            <button onClick={async () => {
                // demo transfer sol with umi
                const umi = createUmi(
                    "https://api.devnet.solana.com",
                    {
                        commitment: "confirmed",
                    }
                ).use(
                    umiWalletAdapterIdentity(phantom)
                )
                const transactionBuilder = new TransactionBuilder()
                transactionBuilder.add(
                    transferSol(umi,{
                        source: umi.identity,
                        destination: publicKey(phantom.address),
                        amount: sol(1),
                    })
                )
                const transaction = await transactionBuilder.useV0().buildWithLatestBlockhash(umi)
                const signedTransaction = await umi.identity.signTransaction(transaction)
                await umi.rpc.sendTransaction(signedTransaction)
            }}>Sign Transaction</button>
            <button onClick={async () => {
                // de   mo transfer sol with umi
                const umi = createUmi(
                    "https://api.devnet.solana.com",
                    {
                        commitment: "confirmed",
                    }
                ).use(
                    umiWalletAdapterIdentity(phantom)
                )
                const transactionBuilder1 = new TransactionBuilder().add(
                    transferSol(umi,{
                        source: umi.identity,
                        destination: publicKey("49MYBZq5jVtgM4E5NxeyH17un1qeWCq9jQwo2mrWPAnE"),
                        amount: sol(1),
                    })
                )
                const transactionBuilder2 = new TransactionBuilder().add(
                    transferSol(umi,{
                        source: umi.identity,
                        destination: publicKey("49MYBZq5jVtgM4E5NxeyH17un1qeWCq9jQwo2mrWPAnE"),
                        amount: sol(0.5),
                    })
                )
                const transaction1 = await transactionBuilder1.useV0().buildWithLatestBlockhash(umi)
                const transaction2 = await transactionBuilder2.useV0().buildWithLatestBlockhash(umi)
                const signedTransactions = await umi.identity.signAllTransactions([transaction1, transaction2])
                // send transactions
                const [tx1, tx2] = await Promise.all([
                    umi.rpc.sendTransaction(signedTransactions[0]),
                    umi.rpc.sendTransaction(signedTransactions[1])
                ])
                console.log(bs58.encode(tx1))
                console.log(bs58.encode(tx2))
            }}>Sign Transactions</button>
        </div>
    </>
}
export default Page