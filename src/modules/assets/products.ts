import { ProductId } from "../entities/gameplay/enums/ids.enum"
import { AssetData } from "./types"

const PREFIX = "products"
export interface AssetProductsData {
    base: AssetData
}
export const assetProductsMap: Record<ProductId, AssetProductsData> = {
    [ProductId.Honey]: {
        base: {
            name: "Honey",  
            assetUrl: `${PREFIX}/honey.png`,
        },
    },
    [ProductId.HoneyQuality]: {
        base: {
            name: "Honey Quality",
            assetUrl: `${PREFIX}/honey.png`,
        },
    },
    [ProductId.Egg]: {
        base: {
            name: "Egg",
            assetUrl: `${PREFIX}/egg.png`,
        },
    },
    [ProductId.EggQuality]: {
        base: {
            name: "Egg Quality",
            assetUrl: `${PREFIX}/egg.png`,
        },
    },
    [ProductId.Milk]: {
        base: {
            name: "Milk",
            assetUrl: `${PREFIX}/milk.png`, 
        },
    },
    [ProductId.MilkQuality]: {
        base: {
            name: "Milk Quality",
            assetUrl: `${PREFIX}/milk.png`,     
        },
    },
    [ProductId.Turnip]: {
        base: {
            name: "Turnip",
            assetUrl: `${PREFIX}/turnip.png`,
        },
    },
    [ProductId.TurnipQuality]: {
        base: {
            name: "Turnip Quality",
            assetUrl: `${PREFIX}/turnip.png`,
        },
    },
    [ProductId.Carrot]: {
        base: {
            name: "Carrot",
            assetUrl: `${PREFIX}/carrot.png`,
        },
    },
    [ProductId.CarrotQuality]: {
        base: {
            name: "Carrot Quality",
            assetUrl: `${PREFIX}/carrot.png`,
        },
    },
    [ProductId.Potato]: {
        base: {
            name: "Potato",
            assetUrl: `${PREFIX}/potato.png`,
        },
    },
    [ProductId.PotatoQuality]: {
        base: {
            name: "Potato Quality",
            assetUrl: `${PREFIX}/potato.png`,
        },
    },
    [ProductId.Pineapple]: {
        base: {
            name: "Pineapple",
            assetUrl: `${PREFIX}/pineapple.png`,
        },
    },
    [ProductId.PineappleQuality]: {
        base: {
            name: "Pineapple Quality",
            assetUrl: `${PREFIX}/pineapple.png`,
        },
    },
    [ProductId.Watermelon]: {
        base: {
            name: "Watermelon",
            assetUrl: `${PREFIX}/watermelon.png`,
        },
    },
    [ProductId.WatermelonQuality]: {
        base: {
            name: "Watermelon Quality",
            assetUrl: `${PREFIX}/watermelon.png`,
        },
    },
    [ProductId.Cucumber]: {
        base: {
            name: "Cucumber",
            assetUrl: `${PREFIX}/cucumber.png`,
        },
    },
    [ProductId.CucumberQuality]: {
        base: {
            name: "Cucumber Quality",
            assetUrl: `${PREFIX}/cucumber.png`,
        },
    },
    [ProductId.BellPepper]: {
        base: {
            name: "Bell Pepper",
            assetUrl: `${PREFIX}/bell-pepper.png`,
        },
    },
    [ProductId.BellPepperQuality]: {
        base: {
            name: "Bell Pepper Quality",
            assetUrl: `${PREFIX}/bell-pepper.png`,
        },
    },
    [ProductId.Banana]: {
        base: {
            name: "Banana",
            assetUrl: `${PREFIX}/banana.png`,
        },
    },
    [ProductId.BananaQuality]: {
        base: {
            name: "Banana Quality",
            assetUrl: `${PREFIX}/banana.png`,
        },
    },
    [ProductId.Apple]: {
        base: {
            name: "Apple",
            assetUrl: `${PREFIX}/apple.png`,
        },
    },
    [ProductId.AppleQuality]: {
        base: {
            name: "Apple Quality",
            assetUrl: `${PREFIX}/apple.png`,
        },
    },
    [ProductId.Daisy]: {
        base: {
            name: "Daisy",
            assetUrl: `${PREFIX}/daisy.png`,
        },
    },
    [ProductId.DaisyQuality]: {
        base: {
            name: "Daisy Quality",
            assetUrl: `${PREFIX}/daisy.png`,
        },
    },
    [ProductId.Strawberry]: {
        base: {
            name: "Strawberry",
            assetUrl: `${PREFIX}/strawberry.png`,
        },
    },
    [ProductId.StrawberryQuality]: {
        base: {
            name: "Strawberry Quality",
            assetUrl: `${PREFIX}/strawberry.png`,
        },
    },
    [ProductId.DragonFruit]: {
        base: {
            name: "Dragon Fruit",
            assetUrl: `${PREFIX}/dragon-fruit.png`,
        },
    },
    [ProductId.DragonFruitQuality]: {
        base: {
            name: "Dragon Fruit Quality",
            assetUrl: `${PREFIX}/dragon-fruit.png`,
        },
    },
    [ProductId.Jackfruit]: {
        base: {
            name: "Jackfruit",
            assetUrl: `${PREFIX}/jackfruit.png`,
        },
    },
    [ProductId.JackfruitQuality]: {
        base: {
            name: "Jackfruit Quality",
            assetUrl: `${PREFIX}/jackfruit.png`,
        },
    },
}