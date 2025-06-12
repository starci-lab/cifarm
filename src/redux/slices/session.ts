import {
    ChainKey,
    CollectionInfo,
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
import { BlockchainBalanceData, BlockchainCollectionData } from "@/modules/apollo"

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

export enum Sidebar {
  Home = "home",
  Assets = "assets",
  DApps = "dapps",
}

export interface WrapperBlockchainCollectionData {
    collection: BlockchainCollectionData
    cached: boolean
    refreshInterval: number
}

export interface WrapperBlockchainBalanceData {
    balance: BlockchainBalanceData
    cached: boolean
    refreshInterval: number
}

export interface SessionState {
  network: Network;
  mnemonic: string;
  accounts: Accounts;
  activeAccountId?: number;
  retries: number;
  authenticated: boolean;
  loaded: boolean;
  balanceSwrs: Record<string, SWRResponse<WrapperBlockchainBalanceData>>;
  nftCollectionSwrs: Record<string, SWRResponse<WrapperBlockchainCollectionData>>;
  // selected collection key
  collectionKey: string;
  // selected nft address
  nftAddress: string;
  chainKey: ChainKey;
  selectedChainKey?: ChainKey;
  // selected token key
  tokenKey: string;
  // placed item id
  selectedPlacedItemId?: string;
  inventories: Array<InventorySchema>;
  placedItems: Array<PlacedItemSchema>;
  selectedInventoryId?: string;
  selectedDeliveryInventoryIds: Array<string>;
  selectedRetrieveInventoryIds: Array<string>;
  user?: UserSchema;
  fromToolIndex?: number;
  selectedToolId?: string;
  playerContext: PlayerContext;
  showGameUI: boolean;
  selectedShipProductId?: string;
  selectedShipInventoryId?: string;
  addresses: Array<string>;
  activeNeighborCard?: NeighborsTab;
  selectedSidebar?: Sidebar;
  selectedMainVisualKey: string;
  slotsDeliveryInventoryLeft: number;
  slotsStorageInventoryLeft: number;
}

const initialState: SessionState = {
    network: defaultNetwork,
    mnemonic: "",
    accounts: {
        accounts: [],
        activateAccountId: 0,
    },
    chainKey: defaultChainKey,
    retries: 0,
    authenticated: false,
    loaded: false,
    balanceSwrs: {},
    nftCollectionSwrs: {},
    collectionKey: "",
    nftAddress: "",
    tokenKey: "",
    selectedDeliveryInventoryIds: [],
    slotsDeliveryInventoryLeft: 0,
    slotsStorageInventoryLeft: 0,
    selectedRetrieveInventoryIds: [],
    inventories: [],
    placedItems: [],
    playerContext: PlayerContext.Home,
    showGameUI: false,
    addresses: [],
    selectedMainVisualKey: "visual-1",
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
        setTokenKey: (state, action: PayloadAction<string>) => {
            state.tokenKey = action.payload
        },
        setRetries: (state, action: PayloadAction<number>) => {
            state.retries = action.payload
        },
        setLoaded: (state, action: PayloadAction<boolean>) => {
            state.loaded = action.payload
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
        setChainKey: (state, action: PayloadAction<ChainKey>) => {
            state.chainKey = action.payload
        },
        setNFTCollectionsSwr: (
            state,
            action: PayloadAction<SetNFTCollectionsSwrParams>
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
        setSelectedDeliveryInventoryIds: (state, action: PayloadAction<Array<string>>) => {
            state.selectedDeliveryInventoryIds = action.payload
        },
        setSelectedRetrieveInventoryIds: (state, action: PayloadAction<Array<string>>) => {
            state.selectedRetrieveInventoryIds = action.payload
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
        setSelectedChainKey: (state, action: PayloadAction<ChainKey | undefined>) => {
            state.selectedChainKey = action.payload
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
        setAddresses: (state, action: PayloadAction<Array<string>>) => {
            state.addresses = action.payload
        },
        setActiveNeighborCard: (state, action: PayloadAction<NeighborsTab>) => {
            state.activeNeighborCard = action.payload
        },
        setActiveAccountId: (state, action: PayloadAction<number>) => {
            state.activeAccountId = action.payload
        },
        setSelectedMainVisualKey: (state, action: PayloadAction<string>) => {
            state.selectedMainVisualKey = action.payload
        },
        setSlotsDeliveryInventoryLeft: (state, action: PayloadAction<number>) => {
            state.slotsDeliveryInventoryLeft = action.payload
        },
        setSlotsStorageInventoryLeft: (state, action: PayloadAction<number>) => {
            state.slotsStorageInventoryLeft = action.payload
        },
    },
})

export const sessionReducer = sessionSlice.reducer
export const {
    setNetwork,
    setMnemonic,
    setAccounts,
    setRetries,
    setTokenKey,
    setLoaded,
    setAuthenticated,
    setBalanceSwr,
    removeBalanceSwr,
    setNFTCollectionsSwr,
    removeNftCollectionsSwr,
    setCollectionKey,
    setNftAddress,
    setSelectedPlacedItemId,
    setInventories,
    setSlotsDeliveryInventoryLeft,
    setSlotsStorageInventoryLeft,
    setSelectedInventoryId,
    setSelectedDeliveryInventoryIds,
    setSelectedRetrieveInventoryIds,
    setUser,
    setFromToolIndex,
    setSelectedToolId,
    setPlayerContext,
    setPlacedItems,
    setShowGameUI,
    setSelectedShipProductId,
    setSelectedShipInventoryId,
    setAddresses,
    setActiveNeighborCard,
    setActiveAccountId,
    setSelectedMainVisualKey,
    setChainKey,
    setSelectedChainKey,
} = sessionSlice.actions

export interface SwitchTokenParams {
  key: string;
  enabled: boolean;
}

export interface SetBalanceSwrParams {
  tokenKey: string;
  swr: SWRResponse<WrapperBlockchainBalanceData>;
}

export interface SetNFTCollectionsSwrParams {
  collectionKey: string;
  swr: SWRResponse<WrapperBlockchainCollectionData>;
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

