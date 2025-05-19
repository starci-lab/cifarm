import { ProductId } from "../entities"
import { AssetData, AssetTextureData, Metadata } from "./types"

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
            assetUrl: `${PREFIX}/honey.png`,
        },
        phaser: {
            base: {
                assetKey: "products-honey",
                assetUrl: `${PREFIX}/honey.png`,
            },
        },  
    },
    [ProductId.HoneyQuality]: {
        name: "Quality Honey",
        description: "Premium honey with enhanced flavor.",
        base: {
            assetKey: "products-honey",
            assetUrl: `${PREFIX}/honey.png`,
        },
        phaser: {
            base: {
                assetKey: "products-honey",
                assetUrl: `${PREFIX}/honey.png`,
                useExisting: true,
            },
        },  
    },
    [ProductId.Egg]: {
        name: "Egg",
        description: "Fresh egg from healthy chickens.",
        base: {
            assetKey: "products-egg",
            assetUrl: `${PREFIX}/egg.png`,
        },
        phaser: {
            base: {
                assetKey: "products-egg",
                assetUrl: `${PREFIX}/egg.png`,
            },
        },
    },
    [ProductId.EggQuality]: {
        name: "Quality Egg",
        description: "Premium egg with enhanced nutrition.",
        base: {
            assetKey: "products-egg",
            assetUrl: `${PREFIX}/egg.png`,
        },
        phaser: {
            base: {
                assetKey: "products-egg",
                assetUrl: `${PREFIX}/egg.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Milk]: {
        name: "Milk",
        description: "Fresh milk from healthy cows.",
        base: {
            assetKey: "products-milk",
            assetUrl: `${PREFIX}/milk.png`, 
        },
        phaser: {
            base: {
                assetKey: "products-milk",
                assetUrl: `${PREFIX}/milk.png`,
            },
        },
    },
    [ProductId.MilkQuality]: {
        name: "Quality Milk",
        description: "Premium milk with enhanced nutrition.",
        base: {
            assetKey: "products-milk",
            assetUrl: `${PREFIX}/milk.png`,     
        },
        phaser: {
            base: {
                assetKey: "products-milk",
                assetUrl: `${PREFIX}/milk.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Turnip]: {
        name: "Turnip",
        description: "Fresh turnip with crisp texture.",
        base: {
            assetKey: "products-turnip",
            assetUrl: `${PREFIX}/turnip.png`,
        },
        phaser: {
            base: {
                assetKey: "products-turnip",
                assetUrl: `${PREFIX}/turnip.png`,
            },
        },
    },
    [ProductId.TurnipQuality]: {
        name: "Quality Turnip",
        description: "Premium turnip with enhanced flavor.",
        base: {
            assetKey: "products-turnip",
            assetUrl: `${PREFIX}/turnip.png`,
        },
        phaser: {
            base: {
                assetKey: "products-turnip",
                assetUrl: `${PREFIX}/turnip.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Carrot]: {
        name: "Carrot",
        description: "Fresh carrot with sweet taste.",
        base: {
            assetKey: "products-carrot",
            assetUrl: `${PREFIX}/carrot.png`,
        },
        phaser: {
            base: {
                assetKey: "products-carrot",
                assetUrl: `${PREFIX}/carrot.png`,
            },
        },  
    },
    [ProductId.CarrotQuality]: {
        name: "Quality Carrot",
        description: "Premium carrot with enhanced nutrition.",
        base: {
            assetKey: "products-carrot",
            assetUrl: `${PREFIX}/carrot.png`,
        },
        phaser: {
            base: {
                assetKey: "products-carrot",
                assetUrl: `${PREFIX}/carrot.png`,
                useExisting: true,
            },
        },  
    },
    [ProductId.Potato]: {
        name: "Potato",
        description: "Fresh potato with starchy texture.",
        base: {
            assetKey: "products-potato",
            assetUrl: `${PREFIX}/potato.png`,
        },
        phaser: {
            base: {
                assetKey: "products-potato",
                assetUrl: `${PREFIX}/potato.png`,
            },
        },
    },
    [ProductId.PotatoQuality]: {
        name: "Quality Potato",
        description: "Premium potato with enhanced flavor.",
        base: {
            assetKey: "products-potato",
            assetUrl: `${PREFIX}/potato.png`,
        },
        phaser: {
            base: {
                assetKey: "products-potato",
                assetUrl: `${PREFIX}/potato.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Pineapple]: {
        name: "Pineapple",
        description: "Fresh pineapple with sweet taste.",
        base: {
            assetKey: "products-pineapple",
            assetUrl: `${PREFIX}/pineapple.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pineapple",
                assetUrl: `${PREFIX}/pineapple.png`,
            },
        },
    },
    [ProductId.PineappleQuality]: {
        name: "Quality Pineapple",
        description: "Premium pineapple with enhanced flavor.",
        base: {
            assetKey: "products-pineapple",
            assetUrl: `${PREFIX}/pineapple.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pineapple",
                assetUrl: `${PREFIX}/pineapple.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Watermelon]: {
        name: "Watermelon",
        description: "Fresh watermelon with juicy flesh.",
        base: {
            assetKey: "products-watermelon",
            assetUrl: `${PREFIX}/watermelon.png`,
        },
        phaser: {
            base: {
                assetKey: "products-watermelon",
                assetUrl: `${PREFIX}/watermelon.png`,
            },
        },
    },
    [ProductId.WatermelonQuality]: {
        name: "Quality Watermelon",
        description: "Premium watermelon with enhanced sweetness.",
        base: {
            assetKey: "products-watermelon",
            assetUrl: `${PREFIX}/watermelon.png`,
        },
        phaser: {
            base: {
                assetKey: "products-watermelon",
                assetUrl: `${PREFIX}/watermelon.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Cucumber]: {
        name: "Cucumber",
        description: "Fresh cucumber with crisp texture.",
        base: {
            assetKey: "products-cucumber",
            assetUrl: `${PREFIX}/cucumber.png`,
        },
        phaser: {
            base: {
                assetKey: "products-cucumber",
                assetUrl: `${PREFIX}/cucumber.png`,
            },
        },
    },
    [ProductId.CucumberQuality]: {
        name: "Quality Cucumber",
        description: "Premium cucumber with enhanced freshness.",
        base: {
            assetKey: "products-cucumber",
            assetUrl: `${PREFIX}/cucumber.png`,
        },
        phaser: {
            base: {
                assetKey: "products-cucumber",
                assetUrl: `${PREFIX}/cucumber.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.BellPepper]: {
        name: "Bell Pepper",
        description: "Fresh bell pepper with mild flavor.",
        base: {
            assetKey: "products-bell-pepper",
            assetUrl: `${PREFIX}/bell-pepper.png`,
        },
        phaser: {
            base: {
                assetKey: "products-bell-pepper",
                assetUrl: `${PREFIX}/bell-pepper.png`,
            },
        },
    },
    [ProductId.BellPepperQuality]: {
        name: "Quality Bell Pepper",
        description: "Premium bell pepper with enhanced color.",
        base: {
            assetKey: "products-bell-pepper",
            assetUrl: `${PREFIX}/bell-pepper.png`,
        },
        phaser: {
            base: {
                assetKey: "products-bell-pepper",
                assetUrl: `${PREFIX}/bell-pepper.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Banana]: {
        name: "Banana",
        description: "Fresh banana with sweet taste.",
        base: {
            assetKey: "products-banana",
            assetUrl: `${PREFIX}/banana.png`,
        },
        phaser: {
            base: {
                assetKey: "products-banana",
                assetUrl: `${PREFIX}/banana.png`,
            },
        },  
    },
    [ProductId.BananaQuality]: {
        name: "Quality Banana",
        description: "Premium banana with enhanced sweetness.",
        base: {
            assetKey: "products-banana",
            assetUrl: `${PREFIX}/banana.png`,
        },
        phaser: {
            base: {
                assetKey: "products-banana",
                assetUrl: `${PREFIX}/banana.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Apple]: {
        name: "Apple",
        description: "Fresh apple with crisp texture.",
        base: {
            assetKey: "products-apple",
            assetUrl: `${PREFIX}/apple.png`,
        },
        phaser: {
            base: {
                assetKey: "products-apple",
                assetUrl: `${PREFIX}/apple.png`,
            },
        },
    },
    [ProductId.AppleQuality]: {
        name: "Quality Apple",
        description: "Premium apple with enhanced flavor.",
        base: {
            assetKey: "products-apple",
            assetUrl: `${PREFIX}/apple.png`,
        },
        phaser: {
            base: {
                assetKey: "products-apple",
                assetUrl: `${PREFIX}/apple.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Daisy]: {
        name: "Daisy",
        description: "Fresh daisy with white petals.",
        base: {
            assetKey: "products-daisy",
            assetUrl: `${PREFIX}/daisy.png`,
        },
        phaser: {
            base: {
                assetKey: "products-daisy",
                assetUrl: `${PREFIX}/daisy.png`,
            },
        },
    },
    [ProductId.DaisyQuality]: {
        name: "Quality Daisy",
        description: "Premium daisy with enhanced beauty.",
        base: {
            assetKey: "products-daisy",
            assetUrl: `${PREFIX}/daisy.png`,
        },
        phaser: {
            base: {
                assetKey: "products-daisy",
                assetUrl: `${PREFIX}/daisy.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Strawberry]: {
        name: "Strawberry",
        description: "Fresh strawberry with sweet taste.",
        base: {
            assetKey: "products-strawberry",
            assetUrl: `${PREFIX}/strawberry.png`,
        },
        phaser: {
            base: {
                assetKey: "products-strawberry",
                assetUrl: `${PREFIX}/strawberry.png`,
            },
        },
    },
    [ProductId.StrawberryQuality]: {
        name: "Quality Strawberry",
        description: "Premium strawberry with enhanced sweetness.",
        base: {
            assetKey: "products-strawberry",
            assetUrl: `${PREFIX}/strawberry.png`,
        },
        phaser: {
            base: {
                assetKey: "products-strawberry",
                assetUrl: `${PREFIX}/strawberry.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.DragonFruit]: {
        name: "Dragon Fruit",
        description: "Fresh dragon fruit with unique texture.",
        base: {
            assetKey: "products-dragon-fruit",
            assetUrl: `${PREFIX}/dragon-fruit.png`,
        },
        phaser: {
            base: {
                assetKey: "products-dragon-fruit",
                assetUrl: `${PREFIX}/dragon-fruit.png`,
            },
        },
    },
    [ProductId.DragonFruitQuality]: {
        name: "Quality Dragon Fruit",
        description: "Premium dragon fruit with enhanced flavor.",
        base: {
            assetKey: "products-dragon-fruit",
            assetUrl: `${PREFIX}/dragon-fruit.png`,
        },
        phaser: {
            base: {
                assetKey: "products-dragon-fruit",
                assetUrl: `${PREFIX}/dragon-fruit.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Jackfruit]: {
        name: "Jackfruit",
        description: "Fresh jackfruit with sweet taste.",
        base: {
            assetKey: "products-jackfruit",
            assetUrl: `${PREFIX}/jackfruit.png`,
        },
        phaser: {
            base: {
                assetKey: "products-jackfruit",
                assetUrl: `${PREFIX}/jackfruit.png`,
            },
        },
    },
    [ProductId.JackfruitQuality]: {
        name: "Quality Jackfruit",
        description: "Premium jackfruit with enhanced sweetness.",
        base: {
            assetKey: "products-jackfruit",
            assetUrl: `${PREFIX}/jackfruit.png`,
        },
        phaser: {
            base: {
                assetKey: "products-jackfruit",
                assetUrl: `${PREFIX}/jackfruit.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Rambutan]: {
        name: "Rambutan",
        description: "Fresh rambutan with sweet taste.",
        base: {
            assetKey: "products-rambutan",
            assetUrl: `${PREFIX}/rambutan.png`,
        },
        phaser: {
            base: {
                assetKey: "products-rambutan",
                assetUrl: `${PREFIX}/rambutan.png`,
            },
        },
    },
    [ProductId.RambutanQuality]: {
        name: "Quality Rambutan",
        description: "Premium rambutan with enhanced sweetness.",
        base: {
            assetKey: "products-rambutan",
            assetUrl: `${PREFIX}/rambutan.png`,
        },
        phaser: {
            base: {
                assetKey: "products-rambutan",
                assetUrl: `${PREFIX}/rambutan.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Pomegranate]: {
        name: "Pomegranate",
        description: "Fresh pomegranate with sweet taste.",
        base: {
            assetKey: "products-pomegranate",
            assetUrl: `${PREFIX}/pomegranate.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pomegranate",
                assetUrl: `${PREFIX}/pomegranate.png`,
            },
        },
    },
    [ProductId.PomegranateQuality]: {
        name: "Quality Pomegranate",
        description: "Premium pomegranate with enhanced sweetness.",
        base: {
            assetKey: "products-pomegranate",
            assetUrl: `${PREFIX}/pomegranate.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pomegranate",
                assetUrl: `${PREFIX}/pomegranate.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Eggplant]: {
        name: "Eggplant",
        description: "Fresh eggplant with mild flavor.",
        base: {
            assetKey: "products-eggplant",
            assetUrl: `${PREFIX}/eggplant.png`,
        },
        phaser: {
            base: {
                assetKey: "products-eggplant",
                assetUrl: `${PREFIX}/eggplant.png`,
            },
        },
    },
    [ProductId.EggplantQuality]: {
        name: "Quality Eggplant",
        description: "Premium eggplant with enhanced flavor.",  
        base: {
            assetKey: "products-eggplant",
            assetUrl: `${PREFIX}/eggplant.png`,
        },
        phaser: {
            base: {
                assetKey: "products-eggplant",
                assetUrl: `${PREFIX}/eggplant.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Tomato]: {
        name: "Tomato",
        description: "Fresh tomato with sweet taste.",
        base: {
            assetKey: "products-tomato",
            assetUrl: `${PREFIX}/tomato.png`,
        },
        phaser: {
            base: {
                assetKey: "products-tomato",
                assetUrl: `${PREFIX}/tomato.png`,
            },
        },
    },
    [ProductId.TomatoQuality]: {
        name: "Quality Tomato",
        description: "Premium tomato with enhanced sweetness.",
        base: { 
            assetKey: "products-tomato",
            assetUrl: `${PREFIX}/tomato.png`,
        },
        phaser: {
            base: {
                assetKey: "products-tomato",
                assetUrl: `${PREFIX}/tomato.png`,
                useExisting: true,
            },
        },
    },  
    [ProductId.Pumpkin]: {
        name: "Pumpkin",
        description: "Fresh pumpkin with sweet taste.",
        base: {
            assetKey: "products-pumpkin",
            assetUrl: `${PREFIX}/pumpkin.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pumpkin",
                assetUrl: `${PREFIX}/pumpkin.png`,
            },
        },
    },  
    [ProductId.PumpkinQuality]: {
        name: "Quality Pumpkin",
        description: "Premium pumpkin with enhanced sweetness.",
        base: {
            assetKey: "products-pumpkin",
            assetUrl: `${PREFIX}/pumpkin.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pumpkin",
                assetUrl: `${PREFIX}/pumpkin.png`,  
                useExisting: true,  
            },
        },
    },
    [ProductId.Sunflower]: {
        name: "Sunflower",
        description: "Fresh sunflower with sweet taste.",
        base: {
            assetKey: "products-sunflower",
            assetUrl: `${PREFIX}/sunflower.png`,
        },
        phaser: {
            base: {
                assetKey: "products-sunflower",
                assetUrl: `${PREFIX}/sunflower.png`,
            },
        },
    },
    
    [ProductId.SunflowerQuality]: {
        name: "Quality Sunflower",
        description: "Premium sunflower with enhanced sweetness.",
        base: {
            assetKey: "products-sunflower",
            assetUrl: `${PREFIX}/sunflower.png`,
        },
        phaser: {
            base: {
                assetKey: "products-sunflower",
                assetUrl: `${PREFIX}/sunflower.png`,
                useExisting: true,
            },
        },
    },
    [ProductId.Pea]: {
        name: "Pea",
        description: "Fresh pea with sweet taste.",
        base: {
            assetKey: "products-pea",
            assetUrl: `${PREFIX}/pea.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pea",
                assetUrl: `${PREFIX}/pea.png`,
            },
        },
    },  
    [ProductId.PeaQuality]: {
        name: "Pea",
        description: "Fresh pea with sweet taste.",
        base: {
            assetKey: "products-pea",
            assetUrl: `${PREFIX}/pea.png`,
        },
        phaser: {
            base: {
                assetKey: "products-pea",
                assetUrl: `${PREFIX}/pea.png`,
            },
        },
    },
}   
