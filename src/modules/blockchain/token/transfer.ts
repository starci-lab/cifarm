import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js"
import {
    createTransferCheckedInstruction,
    getOrCreateAssociatedTokenAccount,
    TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token"
import base58 from "bs58"
import { ChainKey, chainKeyToPlatform, Network, Platform } from "../common"
import {
    SerialTransactionExecutor,
    Transaction as SuiTransaction,
} from "@mysten/sui/transactions"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { defaultNetwork } from "../default"
import { solanaHttpRpcUrl, SUI_COIN_TYPE, suiClient } from "../rpcs"
import { computeRaw } from "@/modules/common"
import { DefaultToken } from "../map"
import { Tokens } from "@/redux"
import { TransferResult } from "../types"

export interface TransferParams {
  chainKey: ChainKey;
  tokenAddress?: string;
  tokenKey?: string;
  network?: Network;
  privateKey: string;
  recipientAddress: string;
  amount: number;
  fromAddress?: string;
  tokens?: Tokens;
}

export const _transferSolana = async ({
    chainKey,
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
    fromAddress,
    tokens,
    tokenKey,
}: TransferParams): Promise<TransferResult> => {
    network = network || defaultNetwork
    const recipientPublicKey = new PublicKey(recipientAddress)
    const connection = new Connection(
        solanaHttpRpcUrl({ chainKey, network })
    )
    const keypair = Keypair.fromSecretKey(base58.decode(privateKey))
    if (tokenKey) {
        if (!tokens) throw new Error("Cannot find balance without tokens")
        const token = tokens[tokenKey]
        //case native
        if (tokenKey === DefaultToken.Native) {
            const tx = new Transaction()
            tx.add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: recipientPublicKey,
                    lamports: computeRaw(amount, token.decimals),
                })
            )
            const signature = await sendAndConfirmTransaction(
                connection,
                tx,
                [keypair],
                {
                    commitment: "confirmed",
                }
            )
            return { txHash: signature }
        }
        tokenAddress = token.address
    }
    if (!tokenAddress)
        throw new Error("Cannot transfer token without token address")
    if (!fromAddress) throw new Error("Cannot transfer token without from address")
    // get mint account
    // check if mint account is valid
    const sourceAssociatedTokenAddress = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        new PublicKey(tokenAddress),
        new PublicKey(fromAddress),
        true,
        "confirmed",
        undefined,
        TOKEN_2022_PROGRAM_ID,
    )   
    console.log(`Source token account: ${sourceAssociatedTokenAddress.address.toBase58()}`)
    const destinationAssociatedTokenAddress = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        new PublicKey(tokenAddress),
        new PublicKey(recipientAddress),
        true,
        "confirmed",
        undefined,
        TOKEN_2022_PROGRAM_ID,
    )
    console.log(`Destination token account: ${destinationAssociatedTokenAddress.address.toBase58()}`)
    // get token metadata
    //console.log(`Destination token account: ${destinationAccount.address.toBase58()}`)
    // get token metadata
    const metadata = await connection.getTokenAccountBalance(sourceAssociatedTokenAddress.address)
    if (!metadata) throw new Error("Token metadata not found")
    console.log(amount)
    //const decimals = metadata.value.decimals
    console.log(metadata.value.decimals)
    const tx = new Transaction()
    tx.add(
        createTransferCheckedInstruction(
            sourceAssociatedTokenAddress.address,
            new PublicKey(tokenAddress),
            destinationAssociatedTokenAddress.address,
            new PublicKey(fromAddress),
            computeRaw(amount, metadata.value.decimals),
            metadata.value.decimals,
            undefined,
            TOKEN_2022_PROGRAM_ID,
        )
    )
    const signature = await sendAndConfirmTransaction(connection, tx, [keypair], {
        commitment: "confirmed",
    })
    return { txHash: signature }
}

export const _transferSui = async ({
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
    tokens,
    tokenKey,
}: TransferParams): Promise<TransferResult> => {
    network = network || defaultNetwork
    const client = suiClient(network)
    const executor = new SerialTransactionExecutor({
        client,
        signer: Ed25519Keypair.fromSecretKey(privateKey),
    })
    if (tokenKey) {
        if (!tokens) throw new Error("Cannot find balance without tokens")

        const decimals = tokens[tokenKey].decimals
        //case native
        if (tokenKey === DefaultToken.Native) {
            const tx = new SuiTransaction()
            const [coin] = tx.splitCoins(SUI_COIN_TYPE, [
                computeRaw(amount, decimals),
            ])
            tx.transferObjects([coin], recipientAddress)
            const { digest } = await executor.executeTransaction(tx)
            return { txHash: digest }
        } else {
            tokenAddress = tokens[tokenKey].address
        }
    }
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")

    const metadata = await client.getCoinMetadata({
        coinType: tokenAddress,
    })
    if (!metadata) throw new Error("Sui coin metadata not found")
    const tx = new SuiTransaction()
    const [coin] = tx.splitCoins(tokenAddress, [
        computeRaw(amount, metadata.decimals),
    ])
    tx.transferObjects([coin], recipientAddress)
    const { digest } = await executor.executeTransaction(tx)
    return { txHash: digest }
}

export const transferToken = async (
    params: TransferParams
): Promise<TransferResult> => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Solana:
        return _transferSolana(params)
    case Platform.Sui:
        return _transferSui(params)
    }
}
