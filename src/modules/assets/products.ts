import { ProductId } from "../entities"
import { AssetData, AssetTextureData, Metadata } from "./types"
import { getAssetUrl } from "./utils"

const PREFIX = "/products"
export interface AssetProductsData extends Metadata {
    base: AssetData
    phaser: {
        base: AssetTextureData
    }
}

export const assetProductMap: Record<ProductId, AssetProductsData> = {
    [ProductId.Honey]: {
        name: "Honey",
        description: "Sweet golden liquid produced by bees.",
        base: {
            assetKey: "products-honey",
            assetUrl: getAssetUrl(`${PREFIX}/honey.png`),
        },
        phaser: {
            base: {
                assetKey: "products-honey",
                assetUrl: getAssetUrl(`${PREFIX}/honey.png`),
                version: 2,
            },
        },  
    },
    [ProductId.HoneyQuality]: {
        name: "Quality Honey",
        description: "Premium honey with enhanced flavor.",
        base: {
            assetKey: "products-honey",
            assetUrl: getAssetUrl(`${PREFIX}/honey.png`),
        },
        phaser: {
            base: {
                assetKey: "products-honey",
                assetUrl: getAssetUrl(`${PREFIX}/honey.png`),
                useExisting: true,
                version: 2,
            },
        },  
    },
    [ProductId.Egg]: {
        name: "Egg",
        description: "Fresh egg from healthy chickens.",
        base: {
            assetKey: "products-egg",
            assetUrl: getAssetUrl(`${PREFIX}/egg.png`),
        },
        phaser: {
            base: {
                assetKey: "products-egg",
                assetUrl: getAssetUrl(`${PREFIX}/egg.png`),
                version: 2,
            },
        },
    },
    [ProductId.EggQuality]: {
        name: "Quality Egg",
        description: "Premium egg with enhanced nutrition.",
        base: {
            assetKey: "products-egg",
            assetUrl: getAssetUrl(`${PREFIX}/egg.png`),
        },
        phaser: {
            base: {
                assetKey: "products-egg",
                assetUrl: getAssetUrl(`${PREFIX}/egg.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Milk]: {
        name: "Milk",
        description: "Fresh milk from healthy cows.",
        base: {
            assetKey: "products-milk",
            assetUrl: getAssetUrl(`${PREFIX}/milk.png`), 
        },
        phaser: {
            base: {
                assetKey: "products-milk",
                assetUrl: getAssetUrl(`${PREFIX}/milk.png`),
                version: 2,
            },
        },
    },
    [ProductId.MilkQuality]: {
        name: "Quality Milk",
        description: "Premium milk with enhanced nutrition.",
        base: {
            assetKey: "products-milk",
            assetUrl: getAssetUrl(`${PREFIX}/milk.png`),     
        },
        phaser: {
            base: {
                assetKey: "products-milk",
                assetUrl: getAssetUrl(`${PREFIX}/milk.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Turnip]: {
        name: "Turnip",
        description: "Fresh turnip with crisp texture.",
        base: {
            assetKey: "products-turnip",
            assetUrl: getAssetUrl(`${PREFIX}/turnip.png`),
        },
        phaser: {
            base: {
                assetKey: "products-turnip",
                assetUrl: getAssetUrl(`${PREFIX}/turnip.png`),
                version: 2,
            },
        },
    },
    [ProductId.TurnipQuality]: {
        name: "Quality Turnip",
        description: "Premium turnip with enhanced flavor.",
        base: {
            assetKey: "products-turnip",
            assetUrl: getAssetUrl(`${PREFIX}/turnip.png`),
        },
        phaser: {
            base: {
                assetKey: "products-turnip",
                assetUrl: getAssetUrl(`${PREFIX}/turnip.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Carrot]: {
        name: "Carrot",
        description: "Fresh carrot with sweet taste.",
        base: {
            assetKey: "products-carrot",
            assetUrl: getAssetUrl(`${PREFIX}/carrot.png`),
        },
        phaser: {
            base: {
                assetKey: "products-carrot",
                assetUrl: getAssetUrl(`${PREFIX}/carrot.png`),
                version: 2,
            },
        },  
    },
    [ProductId.CarrotQuality]: {
        name: "Quality Carrot",
        description: "Premium carrot with enhanced nutrition.",
        base: {
            assetKey: "products-carrot",
            assetUrl: getAssetUrl(`${PREFIX}/carrot.png`),
        },
        phaser: {
            base: {
                assetKey: "products-carrot",
                assetUrl: getAssetUrl(`${PREFIX}/carrot.png`),
                useExisting: true,
            },
        },  
    },
    [ProductId.Potato]: {
        name: "Potato",
        description: "Fresh potato with starchy texture.",
        base: {
            assetKey: "products-potato",
            assetUrl: getAssetUrl(`${PREFIX}/potato.png`),
        },
        phaser: {
            base: {
                assetKey: "products-potato",
                assetUrl: getAssetUrl(`${PREFIX}/potato.png`),
                version: 2,
            },
        },
    },
    [ProductId.PotatoQuality]: {
        name: "Quality Potato",
        description: "Premium potato with enhanced flavor.",
        base: {
            assetKey: "products-potato",
            assetUrl: getAssetUrl(`${PREFIX}/potato.png`),
        },
        phaser: {
            base: {
                assetKey: "products-potato",
                assetUrl: getAssetUrl(`${PREFIX}/potato.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Pineapple]: {
        name: "Pineapple",
        description: "Fresh pineapple with sweet taste.",
        base: {
            assetKey: "products-pineapple",
            assetUrl: getAssetUrl(`${PREFIX}/pineapple.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pineapple",
                assetUrl: getAssetUrl(`${PREFIX}/pineapple.png`),
                version: 2,
            },
        },
    },
    [ProductId.PineappleQuality]: {
        name: "Quality Pineapple",
        description: "Premium pineapple with enhanced flavor.",
        base: {
            assetKey: "products-pineapple",
            assetUrl: getAssetUrl(`${PREFIX}/pineapple.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pineapple",
                assetUrl: getAssetUrl(`${PREFIX}/pineapple.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Watermelon]: {
        name: "Watermelon",
        description: "Fresh watermelon with juicy flesh.",
        base: {
            assetKey: "products-watermelon",
            assetUrl: getAssetUrl(`${PREFIX}/watermelon.png`),
        },
        phaser: {
            base: {
                assetKey: "products-watermelon",
                assetUrl: getAssetUrl(`${PREFIX}/watermelon.png`),
                version: 2,
            },
        },
    },
    [ProductId.WatermelonQuality]: {
        name: "Quality Watermelon",
        description: "Premium watermelon with enhanced sweetness.",
        base: {
            assetKey: "products-watermelon",
            assetUrl: getAssetUrl(`${PREFIX}/watermelon.png`),
        },
        phaser: {
            base: {
                assetKey: "products-watermelon",
                assetUrl: getAssetUrl(`${PREFIX}/watermelon.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Cucumber]: {
        name: "Cucumber",
        description: "Fresh cucumber with crisp texture.",
        base: {
            assetKey: "products-cucumber",
            assetUrl: getAssetUrl(`${PREFIX}/cucumber.png`),
        },
        phaser: {
            base: {
                assetKey: "products-cucumber",
                assetUrl: getAssetUrl(`${PREFIX}/cucumber.png`),
                version: 2,
            },
        },
    },
    [ProductId.CucumberQuality]: {
        name: "Quality Cucumber",
        description: "Premium cucumber with enhanced freshness.",
        base: {
            assetKey: "products-cucumber",
            assetUrl: getAssetUrl(`${PREFIX}/cucumber.png`),
        },
        phaser: {
            base: {
                assetKey: "products-cucumber",
                assetUrl: getAssetUrl(`${PREFIX}/cucumber.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.BellPepper]: {
        name: "Bell Pepper",
        description: "Fresh bell pepper with mild flavor.",
        base: {
            assetKey: "products-bell-pepper",
            assetUrl: getAssetUrl(`${PREFIX}/bell-pepper.png`),
        },
        phaser: {
            base: {
                assetKey: "products-bell-pepper",
                assetUrl: getAssetUrl(`${PREFIX}/bell-pepper.png`),
                version: 2,
            },
        },
    },
    [ProductId.BellPepperQuality]: {
        name: "Quality Bell Pepper",
        description: "Premium bell pepper with enhanced color.",
        base: {
            assetKey: "products-bell-pepper",
            assetUrl: getAssetUrl(`${PREFIX}/bell-pepper.png`),
        },
        phaser: {
            base: {
                assetKey: "products-bell-pepper",
                assetUrl: getAssetUrl(`${PREFIX}/bell-pepper.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Banana]: {
        name: "Banana",
        description: "Fresh banana with sweet taste.",
        base: {
            assetKey: "products-banana",
            assetUrl: getAssetUrl(`${PREFIX}/banana.png`),
        },
        phaser: {
            base: {
                assetKey: "products-banana",
                assetUrl: getAssetUrl(`${PREFIX}/banana.png`),
                version: 2,
            },
        },  
    },
    [ProductId.BananaQuality]: {
        name: "Quality Banana",
        description: "Premium banana with enhanced sweetness.",
        base: {
            assetKey: "products-banana",
            assetUrl: getAssetUrl(`${PREFIX}/banana.png`),
        },
        phaser: {
            base: {
                assetKey: "products-banana",
                assetUrl: getAssetUrl(`${PREFIX}/banana.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Apple]: {
        name: "Apple",
        description: "Fresh apple with crisp texture.",
        base: {
            assetKey: "products-apple",
            assetUrl: getAssetUrl(`${PREFIX}/apple.png`),
        },
        phaser: {
            base: {
                assetKey: "products-apple",
                assetUrl: getAssetUrl(`${PREFIX}/apple.png`),
                version: 2,
            },
        },
    },
    [ProductId.AppleQuality]: {
        name: "Quality Apple",
        description: "Premium apple with enhanced flavor.",
        base: {
            assetKey: "products-apple",
            assetUrl: getAssetUrl(`${PREFIX}/apple.png`),
        },
        phaser: {
            base: {
                assetKey: "products-apple",
                assetUrl: getAssetUrl(`${PREFIX}/apple.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Daisy]: {
        name: "Daisy",
        description: "Fresh daisy with white petals.",
        base: {
            assetKey: "products-daisy",
            assetUrl: getAssetUrl(`${PREFIX}/daisy.png`),
        },
        phaser: {
            base: {
                assetKey: "products-daisy",
                assetUrl: getAssetUrl(`${PREFIX}/daisy.png`),
                version: 2,
            },
        },
    },
    [ProductId.DaisyQuality]: {
        name: "Quality Daisy",
        description: "Premium daisy with enhanced beauty.",
        base: {
            assetKey: "products-daisy",
            assetUrl: getAssetUrl(`${PREFIX}/daisy.png`),
        },
        phaser: {
            base: {
                assetKey: "products-daisy",
                assetUrl: getAssetUrl(`${PREFIX}/daisy.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Strawberry]: {
        name: "Strawberry",
        description: "Fresh strawberry with sweet taste.",
        base: {
            assetKey: "products-strawberry",
            assetUrl: getAssetUrl(`${PREFIX}/strawberry.png`),
        },
        phaser: {
            base: {
                assetKey: "products-strawberry",
                assetUrl: getAssetUrl(`${PREFIX}/strawberry.png`),
                version: 2,
            },
        },
    },
    [ProductId.StrawberryQuality]: {
        name: "Quality Strawberry",
        description: "Premium strawberry with enhanced sweetness.",
        base: {
            assetKey: "products-strawberry",
            assetUrl: getAssetUrl(`${PREFIX}/strawberry.png`),
        },
        phaser: {
            base: {
                assetKey: "products-strawberry",
                assetUrl: getAssetUrl(`${PREFIX}/strawberry.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.DragonFruit]: {
        name: "Dragon Fruit",
        description: "Fresh dragon fruit with unique texture.",
        base: {
            assetKey: "products-dragon-fruit",
            assetUrl: getAssetUrl(`${PREFIX}/dragon-fruit.png`),
        },
        phaser: {
            base: {
                assetKey: "products-dragon-fruit",
                assetUrl: getAssetUrl(`${PREFIX}/dragon-fruit.png`),
                version: 2,
            },
        },
    },
    [ProductId.DragonFruitQuality]: {
        name: "Quality Dragon Fruit",
        description: "Premium dragon fruit with enhanced flavor.",
        base: {
            assetKey: "products-dragon-fruit",
            assetUrl: getAssetUrl(`${PREFIX}/dragon-fruit.png`),
        },
        phaser: {
            base: {
                assetKey: "products-dragon-fruit",
                assetUrl: getAssetUrl(`${PREFIX}/dragon-fruit.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Jackfruit]: {
        name: "Jackfruit",
        description: "Fresh jackfruit with sweet taste.",
        base: {
            assetKey: "products-jackfruit",
            assetUrl: getAssetUrl(`${PREFIX}/jackfruit.png`),
        },
        phaser: {
            base: {
                assetKey: "products-jackfruit",
                assetUrl: getAssetUrl(`${PREFIX}/jackfruit.png`),
                version: 2,
            },
        },
    },
    [ProductId.JackfruitQuality]: {
        name: "Quality Jackfruit",
        description: "Premium jackfruit with enhanced sweetness.",
        base: {
            assetKey: "products-jackfruit",
            assetUrl: getAssetUrl(`${PREFIX}/jackfruit.png`),
        },
        phaser: {
            base: {
                assetKey: "products-jackfruit",
                assetUrl: getAssetUrl(`${PREFIX}/jackfruit.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Rambutan]: {
        name: "Rambutan",
        description: "Fresh rambutan with sweet taste.",
        base: {
            assetKey: "products-rambutan",
            assetUrl: getAssetUrl(`${PREFIX}/rambutan.png`),
        },
        phaser: {
            base: {
                assetKey: "products-rambutan",
                assetUrl: getAssetUrl(`${PREFIX}/rambutan.png`),
                version: 2,
            },
        },
    },
    [ProductId.RambutanQuality]: {
        name: "Quality Rambutan",
        description: "Premium rambutan with enhanced sweetness.",
        base: {
            assetKey: "products-rambutan",
            assetUrl: getAssetUrl(`${PREFIX}/rambutan.png`),
        },
        phaser: {
            base: {
                assetKey: "products-rambutan",
                assetUrl: getAssetUrl(`${PREFIX}/rambutan.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Pomegranate]: {
        name: "Pomegranate",
        description: "Fresh pomegranate with sweet taste.",
        base: {
            assetKey: "products-pomegranate",
            assetUrl: getAssetUrl(`${PREFIX}/pomegranate.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pomegranate",
                assetUrl: getAssetUrl(`${PREFIX}/pomegranate.png`),
                version: 2,
            },
        },
    },
    [ProductId.PomegranateQuality]: {
        name: "Quality Pomegranate",
        description: "Premium pomegranate with enhanced sweetness.",
        base: {
            assetKey: "products-pomegranate",
            assetUrl: getAssetUrl(`${PREFIX}/pomegranate.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pomegranate",
                assetUrl: getAssetUrl(`${PREFIX}/pomegranate.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Eggplant]: {
        name: "Eggplant",
        description: "Fresh eggplant with mild flavor.",
        base: {
            assetKey: "products-eggplant",
            assetUrl: getAssetUrl(`${PREFIX}/eggplant.png`),
        },
        phaser: {
            base: {
                assetKey: "products-eggplant",
                assetUrl: getAssetUrl(`${PREFIX}/eggplant.png`),
                version: 2,
            },
        },
    },
    [ProductId.EggplantQuality]: {
        name: "Quality Eggplant",
        description: "Premium eggplant with enhanced flavor.",  
        base: {
            assetKey: "products-eggplant",
            assetUrl: getAssetUrl(`${PREFIX}/eggplant.png`),
        },
        phaser: {
            base: {
                assetKey: "products-eggplant",
                assetUrl: getAssetUrl(`${PREFIX}/eggplant.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Tomato]: {
        name: "Tomato",
        description: "Fresh tomato with sweet taste.",
        base: {
            assetKey: "products-tomato",
            assetUrl: getAssetUrl(`${PREFIX}/tomato.png`),
        },
        phaser: {
            base: {
                assetKey: "products-tomato",
                assetUrl: getAssetUrl(`${PREFIX}/tomato.png`),
                version: 2,
            },
        },
    },
    [ProductId.TomatoQuality]: {
        name: "Quality Tomato",
        description: "Premium tomato with enhanced sweetness.",
        base: { 
            assetKey: "products-tomato",
            assetUrl: getAssetUrl(`${PREFIX}/tomato.png`),
        },
        phaser: {
            base: {
                assetKey: "products-tomato",
                assetUrl: getAssetUrl(`${PREFIX}/tomato.png`),
                useExisting: true,
                version: 2,
            },
        },
    },  
    [ProductId.Pumpkin]: {
        name: "Pumpkin",
        description: "Fresh pumpkin with sweet taste.",
        base: {
            assetKey: "products-pumpkin",
            assetUrl: getAssetUrl(`${PREFIX}/pumpkin.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pumpkin",
                assetUrl: getAssetUrl(`${PREFIX}/pumpkin.png`),
                version: 2,
            },
        },
    },  
    [ProductId.PumpkinQuality]: {
        name: "Quality Pumpkin",
        description: "Premium pumpkin with enhanced sweetness.",
        base: {
            assetKey: "products-pumpkin",
            assetUrl: getAssetUrl(`${PREFIX}/pumpkin.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pumpkin",
                assetUrl: getAssetUrl(`${PREFIX}/pumpkin.png`),  
                useExisting: true,  
                version: 2,
            },
        },
    },
    [ProductId.Sunflower]: {
        name: "Sunflower",
        description: "Fresh sunflower with sweet taste.",
        base: {
            assetKey: "products-sunflower",
            assetUrl: getAssetUrl(`${PREFIX}/sunflower.png`),
        },
        phaser: {
            base: {
                assetKey: "products-sunflower",
                assetUrl: getAssetUrl(`${PREFIX}/sunflower.png`),
                version: 2,
            },
        },
    },
    
    [ProductId.SunflowerQuality]: {
        name: "Quality Sunflower",
        description: "Premium sunflower with enhanced sweetness.",
        base: {
            assetKey: "products-sunflower",
            assetUrl: getAssetUrl(`${PREFIX}/sunflower.png`),
        },
        phaser: {
            base: {
                assetKey: "products-sunflower",
                assetUrl: getAssetUrl(`${PREFIX}/sunflower.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Pea]: {
        name: "Pea",
        description: "Fresh pea with sweet taste.",
        base: {
            assetKey: "products-pea",
            assetUrl: getAssetUrl(`${PREFIX}/pea.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pea",
                assetUrl: getAssetUrl(`${PREFIX}/pea.png`),
                version: 2,
            },
        },
    },  
    [ProductId.PeaQuality]: {
        name: "Pea",
        description: "Fresh pea with sweet taste.",
        base: {
            assetKey: "products-pea",
            assetUrl: getAssetUrl(`${PREFIX}/pea.png`),
        },
        phaser: {
            base: {
                assetKey: "products-pea",
                assetUrl: getAssetUrl(`${PREFIX}/pea.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
    [ProductId.Cauliflower]: {
        name: "Cauliflower",
        description: "Fresh cauliflower with sweet taste.",
        base: {
            assetKey: "products-cauliflower",
            assetUrl: getAssetUrl(`${PREFIX}/cauliflower.png`),
        },
        phaser: {
            base: {
                assetKey: "products-cauliflower",
                assetUrl: getAssetUrl(`${PREFIX}/cauliflower.png`),
                version: 2,
            },
        },
    },
    [ProductId.CauliflowerQuality]: {
        name: "Quality Cauliflower",
        description: "Premium cauliflower with enhanced sweetness.",
        base: {
            assetKey: "products-cauliflower",
            assetUrl: getAssetUrl(`${PREFIX}/cauliflower.png`),
        },
        phaser: {
            base: {
                assetKey: "products-cauliflower",
                assetUrl: getAssetUrl(`${PREFIX}/cauliflower.png`),
                useExisting: true,
                version: 2,
            },
        },
    },
}
