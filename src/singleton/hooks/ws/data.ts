
export interface ThiefAnimalData {
    quantity: number
    productId: string
    catAssistedSuccess?: boolean
}

export interface ThiefBeeHouseData {
    quantity: number
    productId: string
    catAssistedSuccess?: boolean
}

export interface ThiefFruitData {
    quantity: number
    productId: string
    catAssistedSuccess?: boolean
}

export interface ThiefPlantData {
    quantity: number
    productId: string
    catAssistedSuccess?: boolean
}

export interface HarvestAnimalData {
    quantity: number
    productId: string
}

export interface HarvestBeeHouseData {
    quantity: number
    productId: string
}

export interface HarvestFruitData {
    quantity: number
    productId: string
}   

export interface HarvestPlantData {
    quantity: number
    productId: string
}

export interface BuyAnimalData {
    animalId: string
}

export interface BuyBuildingData {
    buildingId: string
}

export interface BuyFruitData {
    fruitId: string
}

export interface BuyDecorationData {
    decorationId: string
}

export interface BuyPetData {
    petId: string
}

export interface BuyTileData {
    tileId: string
}