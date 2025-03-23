import { AnimalId, BuildingId, CropId, FlowerId, FruitId, Position, SupplyId, ToolId } from "@/modules/entities"

export interface BuySuppliesMessage {
    supplyId: SupplyId
    quantity: number
}

export interface BuyToolMessage {
    toolId: ToolId
}

export interface BuyCropSeedsMessage {
    cropId: CropId
    quantity: number
}

export interface BuyFlowerSeedsMessage {
    flowerId: FlowerId
    quantity: number
}

export interface BuyFruitMessage {
    fruitId: FruitId
    position: Position
}

export interface BuyAnimalMessage {
    animalId: AnimalId
    position: Position
}

export interface BuyBuildingMessage {
    buildingId: BuildingId
    position: Position
}
