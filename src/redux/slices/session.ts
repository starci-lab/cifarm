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

export interface Accounts {
  accounts: Array<Account>;
  currentId: number;
}

export interface Balance {
    amount: number
    isLoading: boolean
}

export interface SessionState {
  network: Network;
  mnemonic: string;
  accounts: Accounts;
  chainKey: ChainKey;
  tokens: Tokens;
  retries: number;
  loaded: boolean;
  authenticated: boolean;
  balances: Record<string, Balance>
}

export type WithEnabled<T> = T & { enabled: boolean };
export type Tokens = Record<string, WithEnabled<TokenInfo>>;
export type ImportedTokens = Record<string, WithEnabled<TokenInfo>>;

const initialState: SessionState = {
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
        tokens[id] = { ...token, enabled: true }
        return tokens
    }, {} as Tokens),
    retries: 0,
    loaded: false,
    authenticated: false,
    balances: {}
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
        },
        setBalance: (state, action: PayloadAction<SetBalanceParams>) => {
            const { tokenKey, balance } = action.payload
            state.balances[tokenKey] = balance
        },
        removeBalance: (state, action: PayloadAction<string>) => {
            delete state.balances[action.payload]
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
    importTokens,
    setRetries,
    setLoaded,
    setAuthenticated,
    setBalance,
    removeBalance,
} = sessionSlice.actions

export interface SwitchTokenParams {
    id: string;
    enabled: boolean;
}

export interface SetBalanceParams {
    tokenKey: string
    balance: Balance
}