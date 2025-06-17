import { ChainKey, Network } from "../common"
import { solanaClient, SUI_COIN_TYPE, suiClient } from "../rpcs"
import { computeDenomination } from "@/modules/common"
import { PublicKey } from "@solana/web3.js"
import { Platform, chainKeyToPlatform } from "../common"
import { defaultNetwork } from "../default"
import { TokenKey, Tokens } from "@/types"

export interface GetBalanceParams {
  chainKey: ChainKey;
  //use token address incase you want to get balance of a specific token
  tokenAddress?: string;
  //use tokenKey incase you want to get balance of a defined token, if tokenKey is set, tokenAddress will be ignored
  tokenKey?: TokenKey;
  network?: Network;
  accountAddress: string;
  //token list for the chainKey, if tokenKey is set but tokens not set, it will throw an error
  tokens?: Tokens;
}

export const getSolanaBalance = async ({
    tokenAddress,
    network,
    accountAddress,
    tokenKey,
    tokens,
    chainKey,
}: GetBalanceParams): Promise<number> => {
    network = network || defaultNetwork
    if (tokenKey) {
        if (!tokens) throw new Error("Cannot find balance without tokens")
        const token = tokens[tokenKey]?.[chainKey]?.[network]
        if (!token) throw new Error("Cannot find balance without token")
        //case native
        if (tokenKey === TokenKey.Native) {
            const decimals = token.decimals
            const balance = await solanaClient({chainKey, network}).getBalance(
                new PublicKey(accountAddress)
            )
            return computeDenomination(balance, decimals)
        }
        tokenAddress = token.tokenAddress
    }
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")
    const result = await solanaClient({
        chainKey,
        network
    }).getParsedTokenAccountsByOwner(
        new PublicKey(accountAddress),
        {
            mint: new PublicKey(tokenAddress),
        }
    )
    return result.value[0].account.data.parsed.info.tokenAmount.uiAmount
}

export const getSuiBalance = async ({
    tokenAddress,
    network,
    accountAddress,
    tokenKey,
    tokens,
    chainKey,
}: GetBalanceParams): Promise<number> => {
    network = network || defaultNetwork
    let decimals = 0
    if (tokenKey) {
        if (!tokens) throw new Error("Cannot find balance without tokens")
        const token = tokens[tokenKey]?.[chainKey]?.[network]
        if (!token) throw new Error("Cannot find balance without token")
        //case native
        if (tokenKey === TokenKey.Native) {
            decimals = token.decimals
            const balance = await suiClient(network).getBalance({
                owner: accountAddress,
                coinType: SUI_COIN_TYPE,
            })
            return computeDenomination(BigInt(balance.totalBalance), decimals)
        }
        tokenAddress = token.tokenAddress
    }
    if (!tokenAddress)
        throw new Error("Cannot find balance without token address")

    if (!decimals) {
        const metadata = await suiClient(network).getCoinMetadata({
            coinType: tokenAddress,
        })
        if (!metadata) throw new Error("Sui coin metadata not found")
        decimals = metadata.decimals
    }

    const balance = await suiClient(network).getBalance({
        coinType: tokenAddress,
        owner: accountAddress,
    })
    return computeDenomination(BigInt(balance.totalBalance), decimals)
}

export const getBalance = (params: GetBalanceParams) => {
    const platform = chainKeyToPlatform(params.chainKey)
    switch (platform) {
    case Platform.Solana:
        return getSolanaBalance(params)
    case Platform.Sui:
        return getSuiBalance(params)
    }
    throw new Error("Invalid chain key")
}
