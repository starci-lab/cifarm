import { NFTData, NFTRarityEnum } from "@/modules/blockchain"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TxResponse, TxResponses } from "@/modules/honeycomb"
import { NFTType, TokenKey } from "@/modules/entities"

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

export interface SellModal {
  placedItemId?: string;
}

export interface UpgradeModal {
  placedItemBuildingId?: string;
}

export enum TransactionType {
  HoneycombProtocolRawTx = "HoneycombProtocolRawTx",
  HoneycombProtocolRawTxs = "HoneycombProtocolRawTxs",
  TransferToken = "TransferToken",
  TransferNFT = "TransferNFT",
  SolanaRawTx = "SolanaRawTx",
}

export interface TokenModal {
  tokenKey?: string;
}

export interface NFTModal {
  nftData?: NFTData;
}

export interface NFTClaimedModal {
  nftType?: NFTType; 
  rarity?: NFTRarityEnum;  
  nftName?: string;
  nftImageUrl?: string;
}

export interface HoneycombProtocolRawTxData {
  txResponse: TxResponse;
}

export interface HoneycombProtocolRawTxsData {
  txResponses: TxResponses;
}

export interface TransferNFTData {
  collectionKey: NFTType;
  nft: NFTData;
  recipientAddress: string;
}

export interface TransferTokenData {
  tokenKey: TokenKey;
  amount: number;
  recipientAddress: string;
}

export interface SolanaRawTxData {
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
      data: SolanaRawTxData;
      type: TransactionType.SolanaRawTx;
    }
) & {
  // extra action to be taken after the transaction is signed
  extraAction?: () => Promise<void> | void;
  // after action instead of broadcast to the network, it will be sent to the network
  postActionHook?: (signedTx: string) => Promise<string> | string;
  // save the address to the database
  saveAddress?: string;
};


export interface ModalSlice {
  warningModal: WarningModal;
  signTransactionModal: SignTransactionModal;
  selectTokenModal: SelectTokenModal;
  nftModal: NFTModal;
  tokenModal: TokenModal;
  downloadPackageModal: DownloadPackageModal;
  sellModal: SellModal;
  upgradeModal: UpgradeModal;
  nftClaimedModal: NFTClaimedModal;
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
            tokenKey: TokenKey.Native,
            amount: 0,
            recipientAddress: "",
        },
        type: TransactionType.TransferToken,
    },
    selectTokenModal: {},
    nftModal: {},
    tokenModal: {},
    downloadPackageModal: {},
    sellModal: {},
    upgradeModal: {},
    nftClaimedModal: {},
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
        setSellModal: (state, action: PayloadAction<SellModal>) => {
            state.sellModal = action.payload
        },
        setUpgradeModal: (state, action: PayloadAction<UpgradeModal>) => {
            state.upgradeModal = action.payload
        },
        setNFTClaimedModal: (state, action: PayloadAction<NFTClaimedModal>) => {
            state.nftClaimedModal = action.payload
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
    setSellModal,
    setUpgradeModal,
    setNFTClaimedModal,
} = modalSlice.actions
