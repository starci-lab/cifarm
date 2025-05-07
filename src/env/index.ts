import { Network } from "@/modules/blockchain/common"

export const envConfig = () => ({
    restApiUrl: process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:3001/api",
    graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3006/graphql",
    wsUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3003",
    isLocal: process.env.NEXT_PUBLIC_IS_LOCAL || false,
    honeycombProjectAddress: {
        [Network.Testnet]: process.env.NEXT_PUBLIC_TESTNET_HONEYCOMB_PROJECT_ADDRESS || "",
        [Network.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_HONEYCOMB_PROJECT_ADDRESS || "",
    },
    honeycombTokenAddress: {
        [Network.Testnet]: process.env.NEXT_PUBLIC_TESTNET_HONEYCOMB_TOKEN_ADDRESS || "",
        [Network.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_HONEYCOMB_TOKEN_ADDRESS || "",
    },
    network: process.env.NEXT_PUBLIC_NETWORK || "testnet",
})