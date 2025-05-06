import {
    ChainKey,
    CollectionInfo,
    CollectionResponse,
    defaultChainKey,
    defaultNetwork,
    Network,
    TokenInfo,
} from "@/modules/blockchain"
import { Account } from "@/modules/dexie"
import { PlacedItemSchema, InventorySchema, UserSchema } from "@/modules/entities"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SWRResponse } from "swr"
import { NeighborsTab } from "./tab"

export enum PlayerContext {
    Home = "home",
    Neighbor = "neighbor",
    Moving = "moving",
    Selling = "selling",
    PlacingNFT = "placingNFT",
    Buying = "buying",
}

export interface Accounts {
  accounts: Array<Account>;
  activateAccountId: number;
}

export interface SessionState {
  network: Network;
  mnemonic: string;
  accounts: Accounts;
  activeAccountId?: number;
  chainKey: ChainKey;
  tokens: StateTokens;
  nftCollections: StateNFTCollections;
  retries: number;
  accountsLoaded: boolean;
  authenticated: boolean;
  balanceSwrs: Record<string, SWRResponse<number>>;
  nftCollectionSwrs: Record<string, SWRResponse<CollectionResponse>>;
  // selected collection key
  collectionKey: string;
  // selected nft address
  nftAddress: string;
  // selected token key
  tokenKey: string;
  // placed item id
  selectedPlacedItemId?: string;
  inventories: Array<InventorySchema>;
  placedItems: Array<PlacedItemSchema>;
  selectedInventoryId?: string;
  selectedDeliveryInventoryId?: string;
  selectedRetrieveInventoryId?: string;
  user?: UserSchema;
  fromToolIndex?: number;
  selectedToolId?: string;
  playerContext: PlayerContext;
  showGameUI: boolean;
  selectedShipProductId?: string;
  selectedShipInventoryId?: string;
  addresses: Array<string>;
  activeNeighborCard?: NeighborsTab
}

export type WithEnabled<T> = T & { enabled: boolean };
export type StateTokens = Record<string, WithEnabled<TokenInfo>>;
export type StateNFTCollections = Record<string, WithEnabled<CollectionInfo>>;

const initialState: SessionState = {
    network: defaultNetwork,
    mnemonic: "",
    accounts: {
        accounts: [],
        activateAccountId: 0,
    },
    chainKey: defaultChainKey,
    tokens: {},
    nftCollections: {},
    retries: 0,
    accountsLoaded: false,
    authenticated: false,
    balanceSwrs: {},
    nftCollectionSwrs: {},
    collectionKey: "",
    nftAddress: "",
    tokenKey: "",
    inventories: [],
    placedItems: [],
    playerContext: PlayerContext.Home,
    showGameUI: false,
    addresses: [],
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setNetwork: (state, action: PayloadAction<Network>) => {
            state.network = action.payload
        },
        setMnemonic: (state, action: PayloadAction<string>) => {
            state.mnemonic = action.payload
        },
        setAccounts: (state, action: PayloadAction<Accounts>) => {
            state.accounts = action.payload
        },
        setChainKey: (state, action: PayloadAction<ChainKey>) => {
            state.chainKey = action.payload
        },
        loadTokens: (state, action: PayloadAction<StateTokens>) => {
            state.tokens = { ...state.tokens, ...action.payload }
        },
        loadNFTCollections: (state, action: PayloadAction<StateNFTCollections>) => {
            state.nftCollections = { ...state.nftCollections, ...action.payload }
        },
        switchToken: (state, action: PayloadAction<SwitchTokenParams>) => {
            const { key, enabled } = action.payload
            const token = state.tokens[key]
            if (!token) throw new Error("Token not found")
            token.enabled = enabled
        },
        switchNFTCollection: (state, action: PayloadAction<SwitchNFTCollectionParams>) => {
            const { key, enabled } = action.payload
            const collection = state.nftCollections[key]
            if (!collection) throw new Error("Collection not found")
            collection.enabled = enabled
        },
        setTokenKey: (state, action: PayloadAction<string>) => {
            state.tokenKey = action.payload
        },
        setRetries: (state, action: PayloadAction<number>) => {
            state.retries = action.payload
        },
        setAccountsLoaded: (state, action: PayloadAction<boolean>) => {
            state.accountsLoaded = action.payload
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.authenticated = action.payload
        },
        setBalanceSwr: (state, action: PayloadAction<SetBalanceSwrParams>) => {
            const { tokenKey, swr } = action.payload
            state.balanceSwrs[tokenKey] = swr
        },
        removeBalanceSwr: (state, action: PayloadAction<string>) => {
            delete state.balanceSwrs[action.payload]
        },
        setNftCollectionsSwr: (
            state,
            action: PayloadAction<SetNftCollectionsSwrParams>
        ) => {
            const { collectionKey, swr } = action.payload
            state.nftCollectionSwrs[collectionKey] = swr
        },
        removeNftCollectionsSwr: (state, action: PayloadAction<string>) => {
            delete state.nftCollectionSwrs[action.payload]
        },
        setCollectionKey: (state, action: PayloadAction<string>) => {
            state.collectionKey = action.payload
        },
        setNftAddress: (state, action: PayloadAction<string>) => {
            state.nftAddress = action.payload
        },
        setSelectedPlacedItemId: (state, action: PayloadAction<string>) => {
            state.selectedPlacedItemId = action.payload
        },
        setInventories: (state, action: PayloadAction<InventorySchema[]>) => {
            state.inventories = action.payload
        },
        setSelectedInventoryId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedInventoryId = action.payload
        },
        setSelectedDeliveryInventoryId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedDeliveryInventoryId = action.payload
        },
        setSelectedRetrieveInventoryId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedRetrieveInventoryId = action.payload
        },
        setUser: (state, action: PayloadAction<UserSchema>) => {
            state.user = action.payload
        },
        setFromToolIndex: (state, action: PayloadAction<number>) => {
            state.fromToolIndex = action.payload
        },
        setSelectedToolId: (state, action: PayloadAction<string>) => {
            state.selectedToolId = action.payload
        },
        setPlayerContext: (state, action: PayloadAction<PlayerContext>) => {
            state.playerContext = action.payload
        },
        setPlacedItems: (state, action: PayloadAction<Array<PlacedItemSchema>>) => {
            state.placedItems = action.payload
        },
        setShowGameUI: (state, action: PayloadAction<boolean>) => {
            state.showGameUI = action.payload
        },
        setSelectedShipProductId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedShipProductId = action.payload
        },
        setSelectedShipInventoryId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedShipInventoryId = action.payload
        },
        updateToken: (state, action: PayloadAction<UpdateTokenParams>) => {
            const { key, token } = action.payload
            const existingToken = state.tokens[key]
            if (!existingToken) throw new Error("Token not found")
            state.tokens[key] = { ...existingToken, ...token }
        },
        updateNFTCollection: (state, action: PayloadAction<UpdateNFTCollectionParams>) => {
            const { key, collection } = action.payload
            const existingCollection = state.nftCollections[key]
            if (!existingCollection) throw new Error("Collection not found")
            state.nftCollections[key] = { ...existingCollection, ...collection }
        },  
        setAddresses: (state, action: PayloadAction<Array<string>>) => {
            state.addresses = action.payload
        },
        setActiveNeighborCard: (state, action: PayloadAction<NeighborsTab>) => {
            state.activeNeighborCard = action.payload
        },
        setActiveAccountId: (state, action: PayloadAction<number>) => {
            state.activeAccountId = action.payload
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const {
    setNetwork,
    setMnemonic,
    setAccounts,
    setChainKey,
    switchToken,
    switchNFTCollection,
    loadTokens,
    loadNFTCollections,
    setRetries,
    setTokenKey,
    setAccountsLoaded,
    setAuthenticated,
    setBalanceSwr,
    removeBalanceSwr,
    setNftCollectionsSwr,
    removeNftCollectionsSwr,
    setCollectionKey,
    setNftAddress,
    setSelectedPlacedItemId,
    setInventories,
    setSelectedInventoryId,
    setSelectedDeliveryInventoryId,
    setSelectedRetrieveInventoryId,
    setUser,
    setFromToolIndex,
    setSelectedToolId,
    setPlayerContext,
    setPlacedItems,
    setShowGameUI,
    setSelectedShipProductId,
    setSelectedShipInventoryId,
    updateToken,
    updateNFTCollection,
    setAddresses,
    setActiveNeighborCard,
    setActiveAccountId,
} = sessionSlice.actions

export interface SwitchTokenParams {
  key: string;
  enabled: boolean;
}

export interface SetBalanceSwrParams {
  tokenKey: string;
  swr: SWRResponse<number>;
}

export interface SetNftCollectionsSwrParams {
  collectionKey: string;
  swr: SWRResponse<CollectionResponse>;
}

export interface SwitchNFTCollectionParams {
  key: string;
  enabled: boolean;
}

export interface UpdateTokenParams {
  key: string;
  token: Partial<TokenInfo>;
}

export interface UpdateNFTCollectionParams {
  key: string;
  collection: Partial<CollectionInfo>;
}

