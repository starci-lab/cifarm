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
  storedAddresses: EntityTable<
    StoredAddress,
    "id" // primary key "id" (for the typings only)
  >;
  packages: EntityTable<
    Package,
    "id" // primary key "id" (for the typings only)
  >;
  assets: EntityTable<
    Asset,
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
  key: SessionDbKey; // enum
  value: string;
}

export interface Package {
  id: number;
  packageId: number;
}

export interface Account {
  id: number;
  chainKey: string;
  network: string;
  accountNumber: number | null;
  address: string;
  publicKey: string;
  privateKey: string;
  username: string;
  imageUrl?: string;
}

export interface Token {
  id: number;
  chainKey: string;
  network: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  imageUrl: string;
  enabled: boolean;
}

export interface CurrentAccount {
  id: number;
  chainKey: string;
  network: string;
  accountId: number;
}

export enum StoredAddressType {
  RecentlyTransferred = "recentlyTransferred",
  Added = "added",
}

export interface StoredAddress {
  id: number;
  chainKey: string;
  network: string;
  accountAddress: string;
  type: StoredAddressType;
}

export interface Asset {
  id: number;
  key: string;
  data: Blob;
  version?: number;
}

//store all sessions
sessionDb.version(1).stores({
    //store all key-value pairs
    keyValueStore: "key, value",
    //accounts
    accounts:
    "++id, chainKey, network, accountNumber, address, publicKey, privateKey, username, imageUrl",
    //tokens
    tokens:
    "++id, chainKey, network, tokenKey, address, enabled, symbol, name, decimals, imageUrl",
    //current selected account
    currentAccount: "++id, chainKey, network, accountId",
    //stored addresses
    storedAddresses: "++id, chainKey, network, accountAddress, type",
    //assets
    packages: "++id, packageId",
    assets: "++id, key, data, version",
})

export { sessionDb }
