import {
    blockchainMap,
    ChainKey,
    defaultChainKey,
    defaultNetwork,
    Network,
    TokenInfo,
} from "@/modules/blockchain"
import { Account } from "@/modules/dexie"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Telegram {
  username: string;
}

export interface Accounts {
  accounts: Array<Account>;
  currentId: number;
}

export interface SessionState {
  telegram: Telegram;
  network: Network;
  mnemonic: string;
  accounts: Accounts;
  chainKey: ChainKey;
  tokens: Tokens;
  retries: number;
  loaded: boolean;
  authenticated: boolean;
}

export type WithValue<T> = T & { enabled: boolean, balance: number };
export type Tokens = Record<string, WithValue<TokenInfo>>;
export type ImportedTokens = Record<string, WithValue<TokenInfo>>;

const initialState: SessionState = {
    telegram: {
        username: "starci",
    },
    network: defaultNetwork,
    mnemonic: "",
    accounts: {
        accounts: [],
        currentId: 0,
    },
    chainKey: defaultChainKey,
    tokens: Object.entries(
        blockchainMap[defaultChainKey].defaultTokens[defaultNetwork]
    ).reduce((tokens, [id, token]) => {
        tokens[id] = { ...token, enabled: true, balance: 0 }
        return tokens
    }, {} as Tokens),
    retries: 0,
    loaded: false,
    authenticated: false,
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setTelegram: (state, action: PayloadAction<Telegram>) => {
            state.telegram = action.payload
        },
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
        importTokens: (state, action: PayloadAction<ImportedTokens>) => {
            state.tokens = { ...state.tokens, ...action.payload }
        },
        switchToken: (state, action: PayloadAction<SwitchTokenParams>) => {
            const { id, enabled }= action.payload
            const token = state.tokens[id]
            if (!token) throw new Error("Token not found")
            token.enabled = enabled
        },
        setRetries: (state, action: PayloadAction<number>) => {
            state.retries = action.payload
        },
        setLoaded: (state, action: PayloadAction<boolean>) => {
            state.loaded = action.payload
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.authenticated = action.payload
        } 
    },
})

export const sessionReducer = sessionSlice.reducer
export const {
    setTelegram,
    setNetwork,
    setMnemonic,
    setAccounts,
    setChainKey,
    switchToken,
    importTokens,
    setRetries,
    setLoaded,
    setAuthenticated
} = sessionSlice.actions

export interface SwitchTokenParams {
    id: string;
    enabled: boolean;
}