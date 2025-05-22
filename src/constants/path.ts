export const pathConstants = {
    default: "/",
    home: "/home",
    import: "/import",
    signIn: "/sign-in",
    importFromMnemonic: "/import/mnemonic",
    importFromPrivateKey: "/import/private-key",
    selectChain: "/select-chain",
    manageNFTCollections: "/manage-nft-collections",
    manageTokens: "/manage-tokens",
    assets: "/assets",
    settings: "/settings",
    play: "/play",
    partnerships: "/partnerships",
    partnershipsHoneycombProtocol: "/partnerships/honeycomb-protocol",
    partnershipsHoneycombProtocolHoneycombDailyReward: "/partnerships/honeycomb-protocol/honeycomb-daily-reward",
    partnershipsHoneycombProtocolHoneycombStaking: "/partnerships/honeycomb-protocol/honeycomb-staking",
    transfer: "/transfer",
    collections: "collections",
    nft: "nft",
    token: "/token",
    dapp: "/dapp",
    dapps: "/dapps",
    dappStarterShop: "/dapp/starter-shop",
    dappWholesaleMarket: "/dapp/wholesale-market",
}


// neutral pages are the ones that don't require authentication
export const neutralPages = [pathConstants.default]
// unauthenticated pages are the ones that will redirect if not authenticated
export const unauthenticatedPages = [
    pathConstants.signIn
]