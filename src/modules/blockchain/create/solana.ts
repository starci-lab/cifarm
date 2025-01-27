import { ChainAccount } from "../common"
import { mnemonicToSeed } from "../../cryptography"
import { Keypair } from "@solana/web3.js"
import { CreateAccountParams } from "./types"
import bs58 from "bs58"

export const createSolanaAccount = async ({
    accountNumber,
    mnemonic,
}: Omit<CreateAccountParams, "chainKey">): Promise<ChainAccount> => {
    const seed = await mnemonicToSeed({
        mnemonic,
        password: accountNumber.toString(),
    })
    const account = Keypair.fromSeed(new Uint8Array(seed.subarray(0, 32)))
    return {
        address: account.publicKey.toString(),
        privateKey: bs58.encode(account.secretKey),
        publicKey: account.publicKey.toString(),
    }
}
