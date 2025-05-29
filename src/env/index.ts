import { Network } from "@/modules/blockchain"

export interface EnvConfig {
    graphqlUrl: string
    wsUrl: string
    socialAuthUrl: string
    isLocal: boolean
    documentUrl: string
    network: Network
    honeycombProjectAddress: Record<Network, string>
    honeycombTokenAddress: Record<Network, string>
    authentication: {
        google: {
            clientId: string
            redirectUri: string
        }
        x: {
            clientId: string
            redirectUri: string
        },
        facebook: {
            clientId: string
            redirectUri: string
        },
        telegram: {
            clientId: string
            redirectUri: string
        }
    }
}
export const envConfig = (): EnvConfig => ({
    graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3006/graphql",
    wsUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3003",
    socialAuthUrl: process.env.NEXT_PUBLIC_SOCIAL_AUTH_URL || "http://localhost:3044",
    isLocal: Boolean(process.env.NEXT_PUBLIC_IS_LOCAL) || false,
    documentUrl: process.env.NEXT_PUBLIC_DOCUMENT_URL || "https://docs.cifarm.xyz/",
    honeycombProjectAddress: {
        [Network.Testnet]: process.env.NEXT_PUBLIC_TESTNET_HONEYCOMB_PROJECT_ADDRESS || "",
        [Network.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_HONEYCOMB_PROJECT_ADDRESS || "",
    },
    honeycombTokenAddress: {
        [Network.Testnet]: process.env.NEXT_PUBLIC_TESTNET_HONEYCOMB_TOKEN_ADDRESS || "",
        [Network.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_HONEYCOMB_TOKEN_ADDRESS || "",
    },
    network: process.env.NEXT_PUBLIC_NETWORK as Network || Network.Testnet,
    authentication: {
        google: {
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
            redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
        },
        x: {
            clientId: process.env.NEXT_PUBLIC_X_CLIENT_ID || "",
            redirectUri: process.env.NEXT_PUBLIC_X_REDIRECT_URI || "",
        },
        facebook: {
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || "",
            redirectUri: process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI || "",
        },
        telegram: {
            clientId: process.env.NEXT_PUBLIC_TELEGRAM_CLIENT_ID || "",
            redirectUri: process.env.NEXT_PUBLIC_TELEGRAM_REDIRECT_URI || "",
        }
    },
})