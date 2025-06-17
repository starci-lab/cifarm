export interface AbstractSchema {
    createdAt: Date
    updatedAt: Date
    id: string
    _id: string
}

export interface StaticAbstractSchema<TId extends string> extends AbstractSchema {
   displayId: TId
}

export interface AbstractPlantSchema<TId extends string = string> extends StaticAbstractSchema<TId > {
    growthStageDuration: number
    price: number
    unlockLevel: number
    availableInShop: boolean
    minHarvestQuantity: number
    maxHarvestQuantity: number
    basicHarvestExperiences: number
    qualityHarvestExperiences: number
}