// db.js
import Dexie, { type EntityTable } from "dexie"
import { PlacedItemTypeId } from "@/modules/entities"
import { ChainKey, Network } from "@/modules/blockchain"

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
  nftCollections: EntityTable<
    NFTCollection,
    "id" // primary key "id" (for the typings only)
  >;
  addresses: EntityTable<
    Address,
    "id" // primary key "id" (for the typings only)
  >;
}

export enum SessionDbKey {
  Mnemonic = "mnemonic",
  CurrentAccountId = "currentAccountId",
  AccessToken = "accessToken",
  RefreshToken = "refreshToken",
  // phantom
  PhantomDappKeyPair = "phantomDappKeyPair",
  PhantomSession = "phantomSession",
  PhantomSharedSecret = "phantomSharedSecret",
  PhantomAccountAddress = "phantomAccountAddress",
  // actions
  SolanaTransaction = "solanaTransaction",
}

// solana transaction types
export enum SolanaTransactionType {
  BuyEnergy = "buyEnergy",
  BuyGolds = "buyGolds",
  ConvertMetaplexNFTs = "convertMetaplexNFTs",
  ExpandLandLimit = "expandLandLimit",
  PurchaseSolanaNFTBoxes = "purchaseSolanaNFTBoxes",
  WrapMetaplexNFT = "wrapMetaplexNFT",
  UnwrapMetaplexNFT = "unwrapMetaplexNFT",
  Ship = "ship",
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
  chainKey: ChainKey;
  network: Network;
  accountNumber: number | null;
  address: string;
  publicKey: string;
  privateKey: string;
  username: string;
  imageUrl?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Token {
  id: number;
  chainKey: string;
  network: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  key: string;
  imageUrl: string;
  enabled: boolean;
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

export interface NFTCollection {
  id: number;
  chainKey: string;
  network: string;
  address: string;
  name: string;
  imageUrl: string;
  enabled: boolean;
  key: string;
  placedItemTypeId: PlacedItemTypeId;
  version: number;
}

export interface Address {
  id: number;
  chainKey: string;
  network: string;
  address: string;
  index?: number;
}

//store all sessions
sessionDb.version(1).stores({
    //store all key-value pairs
    keyValueStore: "key, value",
    //accounts
    accounts:
    "++id, chainKey, network, accountNumber, address, publicKey, privateKey, username, imageUrl, accessToken, refreshToken",
    //tokens
    tokens:
    "++id, chainKey, network, address, enabled, symbol, name, decimals, imageUrl",
    //collections
    nftCollections:
    "++id, chainKey, network, address, name, imageUrl, enabled, key, placedItemTypeId, version",
    //stored addresses
    storedAddresses: "++id, chainKey, network, accountAddress, type",
    //assets
    packages: "++id, packageId",
    assets: "++id, key, data, version",
    //addresses
    addresses: "++id, chainKey, network, address, index",
})

export { sessionDb }
