import { Scene } from "phaser"
import { BaseData } from "./types"
import { ProductId } from "@/modules/entities"
import { loadTexture } from "./utils"

export interface ProductAssetData {
  name: string;
  base: BaseData;
}

export const productAssetMap: Record<
  ProductId,
  ProductAssetData
> = {
    [ProductId.Honey]: {
        name: "Honey",
        base: {
            textureConfig: {
                assetUrl: "products/honey.png",
                key: "honey",
            },
        },
    },
    [ProductId.HoneyQuality]: {
        name: "Honey Quality",
        base: {
            textureConfig: {
                key: "honey",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Egg]: {
        name: "Egg",
        base: {
            textureConfig: {
                assetUrl: "products/egg.png",
                key: "egg",
            },
        },
    },
    [ProductId.EggQuality]: {
        name: "Egg Quality",
        base: {
            textureConfig: {
                key: "egg",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Milk]: {
        name: "Milk",
        base: {
            textureConfig: {
                assetUrl: "products/milk.png",
                key: "milk",
                isQuality: false,
            },
        },
    },
    [ProductId.MilkQuality]: {
        name: "Milk Quality",
        base: {
            textureConfig: {
                key: "milk",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Turnip]: {
        name: "Turnip",
        base: {
            textureConfig: {
                assetUrl: "products/turnip.png",
                key: "turnip",
                isQuality: false,
            },
        },
    },
    [ProductId.TurnipQuality]: {
        name: "Turnip Quality",
        base: {
            textureConfig: {
                key: "turnip",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Carrot]: {
        name: "Carrot",
        base: {
            textureConfig: {
                assetUrl: "products/carrot.png",
                key: "carrot",
                isQuality: false,
            },
        },
    },
    [ProductId.CarrotQuality]: {
        name: "Carrot Quality",
        base: {
            textureConfig: {
                key: "carrot",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Potato]: {
        name: "Potato",
        base: {
            textureConfig: {
                assetUrl: "products/potato.png",
                key: "potato",
                isQuality: false,
            },
        },
    },
    [ProductId.PotatoQuality]: {
        name: "Potato Quality",
        base: {
            textureConfig: {
                key: "potato",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Cucumber]: {
        name: "Cucumber",
        base: {
            textureConfig: {
                assetUrl: "products/cucumber.png",
                key: "cucumber",
                isQuality: false,
            },
        },
    },
    [ProductId.CucumberQuality]: {
        name: "Cucumber Quality",
        base: {
            textureConfig: {
                key: "cucumber",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Pineapple]: {
        name: "Pineapple",
        base: {
            textureConfig: {
                assetUrl: "products/pineapple.png",
                key: "pineapple",
                isQuality: false,
            },
        },
    },
    [ProductId.PineappleQuality]: {
        name: "Pineapple Quality",
        base: {
            textureConfig: {
                key: "pineapple",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Watermelon]: {
        name: "Watermelon",
        base: {
            textureConfig: {
                assetUrl: "products/watermelon.png",
                key: "watermelon",
                isQuality: false,
            },
        },
    },
    [ProductId.WatermelonQuality]: {
        name: "Watermelon Quality",
        base: {
            textureConfig: {
                key: "watermelon",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.BellPepper]: {
        name: "Bell Pepper",
        base: {
            textureConfig: {
                assetUrl: "products/bell-pepper.png",
                key: "bell-pepper",
                isQuality: false,
            },
        },
    },
    [ProductId.BellPepperQuality]: {
        name: "Bell Pepper Quality",
        base: {
            textureConfig: {
                key: "bell-pepper",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Banana]: {
        name: "Banana",
        base: {
            textureConfig: {
                assetUrl: "products/banana.png",
                key: "banana",
                isQuality: false,
            },
        },
    },
    [ProductId.BananaQuality]: {
        name: "Banana Quality",
        base: {
            textureConfig: {
                key: "banana",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Apple]: {
        name: "Apple",
        base: {
            textureConfig: {
                assetUrl: "products/apple.png",
                key: "apple",
                isQuality: false,
            },
        },
    },
    [ProductId.AppleQuality]: {
        name: "Apple Quality",
        base: {
            textureConfig: {
                key: "apple",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Daisy]: {
        name: "Daisy",
        base: {
            textureConfig: {
                assetUrl: "products/daisy.png",
                key: "daisy",
                isQuality: false,
            },
        },
    },
    [ProductId.DaisyQuality]: {
        name: "Daisy Quality",
        base: {
            textureConfig: {
                key: "daisy",
                useExisting: true,
                isQuality: true,
            },
        },
    },
    [ProductId.Strawberry]: {
        name: "Strawberry",
        base: {
            textureConfig: {
                assetUrl: "products/strawberry.png",
                key: "strawberry",
                isQuality: false,
            },
        },
    },
    [ProductId.StrawberryQuality]: {
        name: "Strawberry Quality",
        base: {
            textureConfig: {
                key: "strawberry",
                useExisting: true,
                isQuality: true,
            },
        },
    },
}

// Function to load all product assets
export const loadProductAssets = async (scene: Scene) => {
    // Load all product assets
    const promises: Promise<void>[] = []
    for (const productData of Object.values(productAssetMap)) {
        if (productData.base) {
            if (productData.base) {
                promises.push(loadTexture(scene, productData.base.textureConfig))
            }
        }
    }
    await Promise.all(promises)
}
