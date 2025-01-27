import { Platform, chainKeyToPlatform } from "../common"
import nacl from "tweetnacl"
import bs58 from "bs58"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"

export interface SignMessageParams {
  message: string;
  privateKey: string;
  chainKey: string;
  publicKey: string;
}

export const solanaSignMessage = ({
    message,
    privateKey,
}: SignMessageParams) => {
    return Buffer.from(
        nacl.sign.detached(
            new Uint8Array(Buffer.from(message, "base64")),
            new Uint8Array(bs58.decode(privateKey))
        )
    ).toString("base64")
}

export const suiSignMessage = async ({
    message,
    privateKey,
}: SignMessageParams) => {
    const keypair = Ed25519Keypair.fromSecretKey(privateKey)
    const { signature } = await keypair.signPersonalMessage(new Uint8Array(Buffer.from(message, "base64")))
    return signature
}

export const signMessage = async (params: SignMessageParams): Promise<string> => {
    const platform = chainKeyToPlatform(params.chainKey)

    switch (platform) {
    case Platform.Solana: {
        return solanaSignMessage(params)
    }
    case Platform.Sui: {
        return await suiSignMessage(params)
    }
    default:
        throw new Error(`Platform not supported: ${platform}`)
    }
}
