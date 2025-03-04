import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WarningModal {
    message: string
    nextModalToken?: string
    callback?: () => void
}

export interface ReferralLinkModal {
    code: string
}

export enum TransactionFrom {
    Honeycomb = "Honeycomb",
    Base = "Base",
}

export interface SignTransactionModal {
    serializedTx: string,
    transactionFrom: TransactionFrom,
    data?: unknown
    // extra action to be taken after the transaction is signed
    extraAction?: () => Promise<void> | void
}

export interface ModalSlice {
    warningModal: WarningModal
    signTransactionModal: SignTransactionModal
    referralLinkModal: ReferralLinkModal
}

const initialState: ModalSlice = {
    warningModal: {
        message: "",
        nextModalToken: "",
    },
    signTransactionModal: {
        serializedTx: "",
        transactionFrom: TransactionFrom.Base,
    },
    referralLinkModal: {
        code: ""
    }
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setWarningModal: (state, action: PayloadAction<WarningModal>) => {
            state.warningModal = action.payload
        },
        setSignTransactionModal: (state, action: PayloadAction<SignTransactionModal>) => {
            state.signTransactionModal = action.payload
        },
        setReferralLinkModal: (state, action: PayloadAction<ReferralLinkModal>) => {
            state.referralLinkModal = action.payload
        },
    }
})

export const modalReducer = modalSlice.reducer
export const { setWarningModal, setSignTransactionModal, setReferralLinkModal } = modalSlice.actions
