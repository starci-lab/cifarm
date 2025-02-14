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