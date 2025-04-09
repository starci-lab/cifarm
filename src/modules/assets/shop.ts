import { AssetData } from "./types"
import { CropId, FlowerId, AnimalId, BuildingId, FruitId, TileId, SupplyId, ToolId, PetId } from "../entities"
import { assetSuppliesMap } from "./supplies"
import { assetToolsMap } from "./tools"

export interface AssetShopData {
    crops: Partial<Record<CropId, AssetData>>
    flowers: Partial<Record<FlowerId, AssetData>>
    animals: Partial<Record<AnimalId, AssetData>>
    buildings: Partial<Record<BuildingId, AssetData>>
    fruits: Partial<Record<FruitId, AssetData>>
    tiles: Partial<Record<TileId, AssetData>>
    supplies: Partial<Record<SupplyId, AssetData>>
    tools: Partial<Record<ToolId, AssetData>>
    pets: Partial<Record<PetId, AssetData>>
}

const PREFIX = "shop"
const PREFIX_CROPS = `${PREFIX}/crops`
const PREFIX_FLOWERS = `${PREFIX}/flowers`
const PREFIX_ANIMALS = `${PREFIX}/animals`
const PREFIX_BUILDINGS = `${PREFIX}/buildings`  
const PREFIX_FRUITS = `${PREFIX}/fruits`
const PREFIX_TILES = `${PREFIX}/tiles`
const PREFIX_PETS = `${PREFIX}/pets`

export const assetShopMap: AssetShopData = {
    crops: {
        [CropId.Turnip]: {
            assetUrl: `${PREFIX_CROPS}/turnip.png`
        },
        [CropId.Carrot]: {
            assetUrl: `${PREFIX_CROPS}/carrot.png`
        },
        [CropId.Potato]: {
            assetUrl: `${PREFIX_CROPS}/potato.png`
        },
        [CropId.Pineapple]: {
            assetUrl: `${PREFIX_CROPS}/pineapple.png`
        },
        [CropId.Watermelon]: {
            assetUrl: `${PREFIX_CROPS}/watermelon.png`
        },
        [CropId.Cucumber]: {
            assetUrl: `${PREFIX_CROPS}/cucumber.png`
        },
        [CropId.BellPepper]: {
            assetUrl: `${PREFIX_CROPS}/bell-pepper.png`
        },
        [CropId.Strawberry]: {
            assetUrl: `${PREFIX_CROPS}/strawberry.png`
        },    
    },
    flowers: {
        [FlowerId.Daisy]: {
            assetUrl: `${PREFIX_FLOWERS}/daisy.png`
        },
    },
    animals: {
        [AnimalId.Chicken]: {
            assetUrl: `${PREFIX_ANIMALS}/chicken.png`
        },
        [AnimalId.Cow]: {
            assetUrl: `${PREFIX_ANIMALS}/cow.png`
        },
    },
    buildings: {
        [BuildingId.Barn]: {
            assetUrl: `${PREFIX_BUILDINGS}/barn.png`
        },
        [BuildingId.Coop]: {
            assetUrl: `${PREFIX_BUILDINGS}/coop.png`
        },
        [BuildingId.BeeHouse]: {
            assetUrl: `${PREFIX_BUILDINGS}/bee-house.png`
        },
        [BuildingId.PetHouse]: {
            assetUrl: `${PREFIX_BUILDINGS}/pet-house.png`
        },
    },
    fruits: {
        [FruitId.Apple]: {
            assetUrl: `${PREFIX_FRUITS}/apple.png`
        },
        [FruitId.Banana]: {
            assetUrl: `${PREFIX_FRUITS}/banana.png`
        },
    },
    tiles: {
        [TileId.BasicTile]: {
            assetUrl: `${PREFIX_TILES}/basic-tile.png`
        },
    },
    supplies: Object.fromEntries(
        Object.entries(assetSuppliesMap).map(([key, { base }]) => [key, base])
    ),
    tools: Object.fromEntries(
        Object.entries(assetToolsMap).map(([key, { base }]) => [key, base])
    ),
    pets: {
        [PetId.Dog]: {
            assetUrl: `${PREFIX_PETS}/dog.png`
        },
        [PetId.Cat]: {
            assetUrl: `${PREFIX_PETS}/cat.png`
        },
    },
}
