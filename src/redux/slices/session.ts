import {
    ChainKey,
    CollectionInfo,
    defaultChainKey,
    defaultNetwork,
    Network,
    TokenInfo,
} from "@/modules/blockchain"
import { Account } from "@/modules/dexie"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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

export enum Sidebar {
  Home = "home",
  Assets = "assets",
  DApps = "dapps",
}

export interface SessionState {
  network: Network;
  mnemonic: string;
  accounts: Accounts;
  activeAccountId?: number;
  retries: number;
  authenticated: boolean;
  loaded: boolean;  
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
  fromToolIndex?: number;
  selectedToolId?: string;
  playerContext: PlayerContext;
  showGameUI: boolean;
  addresses: Array<string>;
  activeNeighborCard?: NeighborsTab;
  selectedSidebar?: Sidebar;
  selectedMainVisualKey: string;
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
    collectionKey: "",
    nftAddress: "",
    tokenKey: "",
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
        setChainKey: (state, action: PayloadAction<ChainKey>) => {
            state.chainKey = action.payload
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
        setShowGameUI: (state, action: PayloadAction<boolean>) => {
            state.showGameUI = action.payload
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
    setCollectionKey,
    setNftAddress,
    setSelectedPlacedItemId,
    setFromToolIndex,
    setSelectedToolId,
    setPlayerContext,
    setShowGameUI,
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

