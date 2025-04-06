import { DefaultToken, NFTData } from "@/modules/blockchain"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TxResponse, TxResponses } from "@/modules/honeycomb"
export interface WarningModal {
  message: string;
  nextModalToken?: string;
  callback?: () => void;
}

export interface ReferralLinkModal {
  code: string;
}

export interface SelectTokenModal {
  // if tokenKey is not provided, it will use the first token in the tokens array
  callback?: (tokenKey: string) => void;
  tokenKey?: string;
}

export enum TransactionType {
  HoneycombProtocolRawTx = "HoneycombProtocolRawTx",
  HoneycombProtocolRawTxs = "HoneycombProtocolRawTxs",
  TransferToken = "TransferToken",
  TransferNFT = "TransferNFT",
  FreezeSolanaMetaplexNFT = "FreezeSolanaMetaplexNFT",
}

export interface TokenModal {
  tokenKey?: string;
}

export interface NFTModal {
  nftData?: ExtendedNFTData;
}
export interface HoneycombProtocolRawTxData {
  txResponse: TxResponse;
}

export interface HoneycombProtocolRawTxsData {
  txResponses: TxResponses;
}

export interface TransferNFTData {
  collectionKey: string;
  nft: ExtendedNFTData;
  recipientAddress: string;
}

export interface TransferTokenData {
  tokenKey: string;
  amount: number;
  recipientAddress: string;
}

export interface FreezeSolanaMetaplexNFTData {
  serializedTx: string;
}

export type SignTransactionModal = (
  | {
      data: HoneycombProtocolRawTxData;
      type: TransactionType.HoneycombProtocolRawTx;
    }
  | {
      data: HoneycombProtocolRawTxsData;
      type: TransactionType.HoneycombProtocolRawTxs;
    }
  | {
      data: TransferTokenData;
      type: TransactionType.TransferToken;
    }
  | {
      data: TransferNFTData;
      type: TransactionType.TransferNFT;
    }
  | {
      data: FreezeSolanaMetaplexNFTData;
      type: TransactionType.FreezeSolanaMetaplexNFT;
    }
) & {
  // extra action to be taken after the transaction is signed
  extraAction?: () => Promise<void> | void;
};

export interface ExtendedNFTData extends NFTData {
  collectionKey: string;
}

export interface ModalSlice {
  warningModal: WarningModal;
  signTransactionModal: SignTransactionModal;
  selectTokenModal: SelectTokenModal;
  nftModal: NFTModal;
  tokenModal: TokenModal;
  downloadPackageModal: DownloadPackageModal;
}

export interface DownloadPackageModal {
  packageId?: number;
}

const initialState: ModalSlice = {
    warningModal: {
        message: "",
        nextModalToken: "",
    },
    signTransactionModal: {
        data: {
            tokenKey: DefaultToken.Native,
            amount: 0,
            recipientAddress: "",
        },
        type: TransactionType.TransferToken,
    },
    selectTokenModal: {},
    nftModal: {},
    tokenModal: {},
    downloadPackageModal: {},
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setWarningModal: (state, action: PayloadAction<WarningModal>) => {
            state.warningModal = action.payload
        },
        setSignTransactionModal: (
            state,
            action: PayloadAction<SignTransactionModal>
        ) => {
            state.signTransactionModal = action.payload
        },
        setSelectTokenModal: (state, action: PayloadAction<SelectTokenModal>) => {
            state.selectTokenModal = action.payload
        },
        setNFTModal: (state, action: PayloadAction<NFTModal>) => {
            state.nftModal = action.payload
        },
        setTokenModal: (state, action: PayloadAction<TokenModal>) => {
            state.tokenModal = action.payload
        },
        setDownloadPackageModal: (state, action: PayloadAction<DownloadPackageModal>) => {
            state.downloadPackageModal = action.payload
        },
    },
})

export const modalReducer = modalSlice.reducer
export const {
    setWarningModal,
    setSignTransactionModal,
    setSelectTokenModal,
    setNFTModal,
    setTokenModal,
    setDownloadPackageModal,
} = modalSlice.actions
