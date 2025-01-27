import { ChainAccount, Platform } from "../common"
import { chainKeyToPlatform } from "../common/utils/base"
import { createSolanaAccount } from "./solana"
import { createSuiAccount } from "./sui"
import { CreateAccountParams } from "./types"

export const createAccount = async (
    params: CreateAccountParams
): Promise<ChainAccount | null> => {
    if (params.mnemonic === "") return null

    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Solana:
        return createSolanaAccount(params)
    case Platform.Sui:
        return createSuiAccount(params)
    }
}
