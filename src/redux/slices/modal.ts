import { DefaultToken } from "@/modules/blockchain"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
  TransferToken = "TransferToken",
}

export interface HoneycombProtocolRawTxData {
  serializedTx: string;
}

export interface TransferTokenData {
  tokenKey: string;
  amount: number;
  recipientAddress: string;
}

export type SignTransactionModal = ({
      data: HoneycombProtocolRawTxData;
      type: TransactionType.HoneycombProtocolRawTx;
    }
  | {
      data: TransferTokenData;
      type: TransactionType.TransferToken;
    }
) & {
  // extra action to be taken after the transaction is signed
  extraAction?: () => Promise<void> | void;
};

export interface ModalSlice {
  warningModal: WarningModal;
  signTransactionModal: SignTransactionModal;
  selectTokenModal: SelectTokenModal;
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
        type: TransactionType.TransferToken
    },
    selectTokenModal: {},
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
    },
})

export const modalReducer = modalSlice.reducer
export const { setWarningModal, setSignTransactionModal, setSelectTokenModal } =
  modalSlice.actions
