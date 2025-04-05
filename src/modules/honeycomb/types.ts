
export interface TxResponse {
    transaction: string
    blockhash: string
    lastValidBlockHeight: number
}

export interface TxResponses {
    transactions: Array<string>
    blockhash: string
    lastValidBlockHeight: number
}