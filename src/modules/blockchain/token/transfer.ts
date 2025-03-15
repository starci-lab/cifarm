
import {
    mplTokenMetadata,
    fetchDigitalAsset,
} from "@metaplex-foundation/mpl-token-metadata"
import { keypairIdentity, publicKey, sol } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import {
    findAssociatedTokenPda,
    transferTokens,
    transferSol,
} from "@metaplex-foundation/mpl-toolbox"
import { base58 } from "@metaplex-foundation/umi/serializers"
import { ChainKey, chainKeyToPlatform, Network, Platform } from "../common"
import {
    Transaction,
    SerialTransactionExecutor,
} from "@mysten/sui/transactions"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { defaultNetwork } from "../default"
import { solanaHttpRpcUrl, SUI_COIN_TYPE, suiClient } from "../rpcs"
import { computeRaw } from "@/modules/common"
import { DefaultToken } from "../map"
import { Tokens } from "@/redux"

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

export interface TransferResult {
  txHash: string;
}

export const _transferSolana = async ({
    chainKey,
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
    tokens,
    tokenKey
}: TransferParams): Promise<TransferResult> => {
    network = network || defaultNetwork
    const recipientPublicKey = publicKey(recipientAddress)
    if (tokenKey) {
        if (!tokens) throw new Error("Cannot find balance without tokens")
        //case native
        if (tokenKey === DefaultToken.Native) {
            const umi = createUmi(solanaHttpRpcUrl({ chainKey, network })).use(
                mplTokenMetadata()
            )
            const keypair = umi.eddsa.createKeypairFromSecretKey(
                base58.serialize(privateKey)
            )
            umi.use(keypairIdentity(keypair))
    
            const { signature } = await transferSol(umi, {
                source: umi.identity,
                destination: recipientPublicKey,
                amount: sol(amount),
            }).sendAndConfirm(umi)
            const txHash = base58.deserialize(signature)[0]
            return { txHash }
        } else {
            tokenAddress = tokens[tokenKey].address
        }
    }
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")
    const umi = createUmi(solanaHttpRpcUrl({ chainKey, network })).use(
        mplTokenMetadata()
    )
    const asset = await fetchDigitalAsset(umi, publicKey(tokenAddress))
    const keypair = umi.eddsa.createKeypairFromSecretKey(
        new Uint8Array(Buffer.from(privateKey, "hex"))
    )
    umi.use(keypairIdentity(keypair))
    const tokenPublicKey = publicKey(tokenAddress)

    const sourceTokenAccount = findAssociatedTokenPda(umi, {
        mint: tokenPublicKey,
        owner: umi.identity.publicKey,
    })

    const destinationTokenAccount = findAssociatedTokenPda(umi, {
        mint: tokenPublicKey,
        owner: recipientPublicKey,
    })
    const { signature } = await transferTokens(umi, {
        source: sourceTokenAccount,
        destination: destinationTokenAccount,
        amount: computeRaw(amount, asset.mint.decimals),
    }).sendAndConfirm(umi)
    const txHash = base58.deserialize(signature)[0]
    return { txHash }
}

export const _transferSui = async ({
    tokenAddress,
    network,
    privateKey,
    recipientAddress,
    amount,
    tokens,
    tokenKey
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
            const tx = new Transaction()
            const [coin] = tx.splitCoins(SUI_COIN_TYPE, [computeRaw(amount, decimals)])
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
    const tx = new Transaction()
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
