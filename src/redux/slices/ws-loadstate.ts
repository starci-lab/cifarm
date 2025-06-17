import { CropId, FlowerId, SupplyId, ToolId } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WsLoadState {
    shop: {
        crops: Partial<Record<CropId, boolean>>
        flowers: Partial<Record<FlowerId, boolean>>
        supplies: Partial<Record<SupplyId, boolean>>
        tools: Partial<Record<ToolId, boolean>>
    }
}

const initialState: WsLoadState = {
    shop: {
        crops: {},
        flowers: {},
        supplies: {},
        tools: {},
    },
}

export const wsLoadStateSlice = createSlice({
    name: "wsLoadState",
    initialState,
    reducers: {
        setShopCrop: (state, action: PayloadAction<{ cropId: CropId, isLoading: boolean }>) => {
            state.shop.crops[action.payload.cropId] = action.payload.isLoading
        },
        setShopFlower: (state, action: PayloadAction<{ flowerId: FlowerId, isLoading: boolean }>) => {
            state.shop.flowers[action.payload.flowerId] = action.payload.isLoading
        },
        setShopSupply: (state, action: PayloadAction<{ supplyId: SupplyId, isLoading: boolean }>) => {
            state.shop.supplies[action.payload.supplyId] = action.payload.isLoading
        },
        setShopTool: (state, action: PayloadAction<{ toolId: ToolId, isLoading: boolean }>) => {
            state.shop.tools[action.payload.toolId] = action.payload.isLoading
        },
    },
})

export const wsLoadStateReducer = wsLoadStateSlice.reducer
export const { setShopCrop, setShopFlower, setShopSupply, setShopTool } = wsLoadStateSlice.actions
