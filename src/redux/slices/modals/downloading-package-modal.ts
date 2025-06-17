import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface DownloadData {
  progress: number;
}
export interface DownloadingPackageModalSlice {
  downloadProgresses: Record<string, DownloadData>;
  totalDownloadBytes: Record<string, number>;
  downloadCompleted: boolean;
}

const initialState: DownloadingPackageModalSlice = {
    downloadProgresses: {},
    totalDownloadBytes: {},
    downloadCompleted: false,
}

export const downloadingPackageModalSlice = createSlice({
    name: "downloadingPackageModal",
    initialState,
    reducers: {
        addDownloadProgress: (
            state,
            action: PayloadAction<{ key: string; data: DownloadData }>
        ) => {
            state.downloadProgresses = {
                ...state.downloadProgresses,
                [action.payload.key]: action.payload.data,
            }
        },
        setTotalDownloadBytes: (
            state,
            action: PayloadAction<Record<string, number>>
        ) => {
            state.totalDownloadBytes = {
                ...state.totalDownloadBytes,
                ...action.payload,
            }
        },
        setDownloadCompleted: (state, action: PayloadAction<boolean>) => {
            state.downloadCompleted = action.payload
        },
    },
})

export const downloadingPackageModalReducer =
  downloadingPackageModalSlice.reducer
export const {
    addDownloadProgress,
    setTotalDownloadBytes,
    setDownloadCompleted,
} = downloadingPackageModalSlice.actions
