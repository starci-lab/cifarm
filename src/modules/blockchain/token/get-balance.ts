import { ChainKey, Network } from "../common"
import { solanaClient, SUI_COIN_TYPE, suiClient } from "../rpcs"
import { computeDenomination } from "@/modules/common"
import { PublicKey } from "@solana/web3.js"
import { Platform, chainKeyToPlatform } from "../common"
import { DefaultToken } from "../map"
import { StateTokens } from "@/redux"
import { defaultNetwork } from "../default"

export interface GetBalanceParams {
  chainKey: ChainKey;
  //use token address incase you want to get balance of a specific token
  tokenAddress?: string;
  //use tokenKey incase you want to get balance of a defined token, if tokenKey is set, tokenAddress will be ignored
  tokenKey?: string;
  network?: Network;
  accountAddress: string;
  //token list for the chainKey, if tokenKey is set but tokens not set, it will throw an error
  tokens?: StateTokens;
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
        const token = tokens[tokenKey]
        //case native
        if (tokenKey === DefaultToken.Native) {
            const decimals = token.decimals
            const balance = await solanaClient({chainKey, network}).getBalance(
                new PublicKey(accountAddress)
            )
            return computeDenomination(balance, decimals)
        }
        tokenAddress = token.address
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
    tokens
}: GetBalanceParams): Promise<number> => {
    network = network || defaultNetwork
    let decimals = 0
    if (tokenKey) {
        if (!tokens) throw new Error("Cannot find balance without tokens")
        //case native
        if (tokenKey === DefaultToken.Native) {
            decimals = tokens[tokenKey].decimals
            const balance = await suiClient(network).getBalance({
                owner: accountAddress,
                coinType: SUI_COIN_TYPE,
            })
            return computeDenomination(BigInt(balance.totalBalance), decimals)
        }
        tokenAddress = tokens[tokenKey].address
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
}
