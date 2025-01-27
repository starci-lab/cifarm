import { ChainKey, defaultChainKey, Network } from "@/modules/blockchain"
import { Account } from "@/modules/dexie"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Telegram {
    username: string;
}

export interface Accounts {
    accounts: Array<Account>;
    currentId: number;
}

export interface AuthenticationState {
  telegram: Telegram;
  network: Network;
  pin: string;
  mnemonic: string;
  accounts: Accounts;
  chainKey: ChainKey;
}

const initialState: AuthenticationState = {
    telegram: {
        username: "starci",
    },
    network: Network.Testnet,
    pin: "",
    mnemonic: "",
    accounts: {
        accounts: [],
        currentId: 0,
    },
    chainKey: defaultChainKey
}

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setTelegram: (state, action: PayloadAction<Telegram>) => {
            state.telegram = action.payload
        },
        setNetwork: (state, action: PayloadAction<Network>) => {
            state.network = action.payload
        },
        setPin: (state, action: PayloadAction<string>) => {
            state.pin = action.payload
        },
        setMnemonic: (state, action: PayloadAction<string>) => {
            state.mnemonic = action.payload
        },
        setAccounts: (state, action: PayloadAction<Accounts>) => {
            state.accounts = action.payload
        },
        setChainKey: (state, action: PayloadAction<ChainKey>) => {
            state.chainKey = action.payload
        }
    },
})

export const authenticationReducer = authenticationSlice.reducer
export const { setTelegram, setNetwork, setPin, setMnemonic, setAccounts, setChainKey } = authenticationSlice.actions
