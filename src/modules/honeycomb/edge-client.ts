import createEdgeClient from "@honeycomb-protocol/edge-client"
import { Network } from "../blockchain"
export const TESTNET_API_URL= "https://edge.test.honeycombprotocol.com/"
export const MAINNET_API_URL= "https://edge.main.honeycombprotocol.com/"

export const edgeClient = (network: Network = Network.Testnet) => createEdgeClient(network === Network.Testnet ? TESTNET_API_URL : MAINNET_API_URL, true)