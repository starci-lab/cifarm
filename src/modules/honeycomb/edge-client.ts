import createEdgeClient from "@honeycomb-protocol/edge-client"
export const API_URL= "https://edge.test.honeycombprotocol.com"
export const edgeClient = createEdgeClient(API_URL, true)