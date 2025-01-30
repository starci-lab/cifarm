import { StringAbstractEntity } from "./abstract"

export interface KeyValueStoreEntity extends StringAbstractEntity {
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