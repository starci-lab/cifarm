import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface DownloadPackageModalState {
    packageId?: string
}

const initialState: DownloadPackageModalState = {
    packageId: undefined
}

export const downloadPackageModalSlice = createSlice({
    name: "downloadPackageModal",
    initialState,
    reducers: {
        setDownloadPackageId: (state, action: PayloadAction<string | undefined>) => {
            state.packageId = action.payload
        }
    }
})

export const downloadPackageModalReducer = downloadPackageModalSlice.reducer
export const { setDownloadPackageId } = downloadPackageModalSlice.actions