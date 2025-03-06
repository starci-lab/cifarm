// db.js
import Dexie, { type EntityTable } from "dexie"

const sessionDb = new Dexie("SessionDB") as Dexie & {
  keyValueStore: EntityTable<
  KeyValueStore,
    "key" // primary key "id" (for the typings only)
  >;
  accounts: EntityTable<
  Account,
    "id" // primary key "id" (for the typings only)
  >;
  tokens: EntityTable<
  Token,
    "id" // primary key "id" (for the typings only)
  >;
  currentAccount: EntityTable<
  CurrentAccount,
    "id" // primary key "id" (for the typings only)
  >;
}

export enum SessionDbKey {
  Mnemonic = "mnemonic",
  AccessToken = "accessToken",
  RefreshToken = "refreshToken",
  HoneycombDailyRewardTransaction = "honeycombDailyRewardTransaction",
  HoneycombMintOffchainTokensTransaction = "honeycombMintOffchainTokensTransaction",
}

export interface KeyValueStore {
    key: SessionDbKey // enum
    value: string
}

export interface Account {
    id: number
    chainKey: string
    network: string
    accountNumber: number | null
    address: string
    publicKey: string
    privateKey: string
    username: string
    imageUrl?: string
}

export interface Token {
    id: number
    chainKey: string
    network: string
    address: string
    symbol: string
    name: string
    decimals: number
    imageUrl: string
    enabled: boolean
}

export interface CurrentAccount {
    id: number
    chainKey: string
    network: string
    accountId: number
}

//store all sessions
sessionDb.version(1).stores({
    //store all key-value pairs
    keyValueStore: "key, value",
    //accounts
    accounts: "++id, chainKey, network, accountNumber, address, publicKey, privateKey, username, imageUrl",
    //tokens
    tokens: "++id, chainKey, network, tokenKey, address, enabled, symbol, name, decimals, imageUrl",
    //current selected account
    currentAccount: "++id, chainKey, network, accountId",
})

export { sessionDb } 