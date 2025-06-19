import { BlockchainNFTData } from "@/modules/apollo"
import { NFTCollectionKey, TokenKey } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum TransactionType {
  TransferToken = "TransferToken",
  TransferNFT = "TransferNFT",
  SolanaRawTx = "SolanaRawTx",
  SolanaRawTxs = "SolanaRawTxs",
}

export interface TransferNFTData {
  collectionKey: NFTCollectionKey;
  nft: BlockchainNFTData;
  recipientAddress: string;
}

export interface TransferTokenData {
  tokenKey: TokenKey;
  amount: number;
  recipientAddress: string;
}

export interface SolanaRawTxsData {
  serializedTxs: Array<string>;
}

export interface SolanaRawTxData {
  serializedTx: string;
}

export type SignTransactionState = Partial<
  (
    | {
        data: TransferTokenData;
        type: TransactionType.TransferToken;
      }
    | {
        data: TransferNFTData;
        type: TransactionType.TransferNFT;
      }
    | {
        data: SolanaRawTxData;
        type: TransactionType.SolanaRawTx;
      }
    | {
        data: SolanaRawTxsData;
        type: TransactionType.SolanaRawTxs;
      }
  ) & {
    // extra action to be taken after the transaction is signed
    extraAction?: () => Promise<void> | void;
    postActionHook?: (
      signedTxs: Array<string> | string
    ) => Promise<string> | string;
    // save the address to the database
    saveAddress?: string;
  }
>;

const initialState: SignTransactionState = {}

export const signTransactionModalSlice = createSlice({
    name: "signTransactionModal",
    initialState,
    reducers: {
        setSignTransactionModalContent: (
            state,
            action: PayloadAction<SignTransactionState>
        ) => {
            state = action.payload
            return state
        },
    },
})

export const { setSignTransactionModalContent } =
  signTransactionModalSlice.actions
export const signTransactionModalReducer = signTransactionModalSlice.reducer
