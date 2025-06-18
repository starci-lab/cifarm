import { TokenKey } from "@/types"
import { AbstractSchema } from "./abstract"

export interface KeyValueStoreSchema extends AbstractSchema {
    value: object
}

export interface AnimalGrowthLastSchedule {
    date: Date
}

export interface CropGrowthLastSchedule {
    date: Date
}

export interface EnergyGrowthLastSchedule {
    date: Date
}

export interface VaultData {
    tokenLocked: number
    tokenKey: TokenKey
}

export interface VaultInfo {
    data: Array<VaultData>
}