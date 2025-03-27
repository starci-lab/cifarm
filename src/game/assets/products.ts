import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { ProductId } from "@/modules/entities"
import { fetchAsset } from "./fetch"

export interface ProductAssetData {
  name: string;
  textureConfig: TextureConfig;
}

export const productAssetMap: Record<
  ProductId,
  ProductAssetData
> = {
    [ProductId.Egg]: {
        name: "Egg",
        textureConfig: {
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/products/egg.png",
            key: "egg",
        },
    },
    [ProductId.EggQuality]: {
        name: "Egg Quality",
        textureConfig: {
            key: "egg",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Milk]: {
        name: "Milk",
        textureConfig: {
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/products/milk.png",
            key: "milk",
            isQuality: false,
        },
        
    },
    [ProductId.MilkQuality]: {
        name: "Milk Quality",
        textureConfig: {
            key: "milk",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Turnip]: {
        name: "Turnip",
        textureConfig: {
            assetUrl: "https://cifarm.s3.ap-southeast-1.amazonaws.com/assets/products/turnip.png",
            key: "turnip",
            isQuality: false,
        },
    },
    [ProductId.TurnipQuality]: {
        name: "Turnip Quality",
        textureConfig: {
            key: "turnip",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Carrot]: {
        name: "Carrot",
        textureConfig: {
            assetUrl: "products/carrot.png",
            key: "carrot",
            isQuality: false,
        },
    },
    [ProductId.CarrotQuality]: {
        name: "Carrot Quality",
        textureConfig: {
            key: "carrot",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Potato]: {
        name: "Potato",
        textureConfig: {
            assetUrl: "products/potato.png",
            key: "potato",
            isQuality: false,
        },
    },
    [ProductId.PotatoQuality]: {
        name: "Potato Quality",
        textureConfig: {
            key: "potato",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Cucumber]: {
        name: "Cucumber",
        textureConfig: {
            assetUrl: "products/cucumber.png",
            key: "cucumber",
            isQuality: false,
        },
    },
    [ProductId.CucumberQuality]: {
        name: "Cucumber Quality",
        textureConfig: {
            key: "cucumber",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Pineapple]: {
        name: "Pineapple",
        textureConfig: {
            assetUrl: "products/pineapple.png",
            key: "pineapple",
            isQuality: false,
        },
    },
    [ProductId.PineappleQuality]: {
        name: "Pineapple Quality",
        textureConfig: {
            key: "pineapple",
            isQuality: true,
        },
    },
    [ProductId.Watermelon]: {
        name: "Watermelon",
        textureConfig: {
            assetUrl: "products/watermelon.png",
            key: "watermelon",
            isQuality: false,
        },
    },
    [ProductId.WatermelonQuality]: {
        name: "Watermelon Quality",
        textureConfig: {
            key: "watermelon",
            isQuality: true,
        },
    },
    [ProductId.BellPepper]: {
        name: "Bell Pepper",
        textureConfig: {
            assetUrl: "products/bell-pepper.png",
            key: "bell-pepper",
            isQuality: false,
        },
    },
    [ProductId.BellPepperQuality]: {
        name: "Bell Pepper Quality",
        textureConfig: {
            key: "bell-pepper",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Banana]: {
        name: "Banana",
        textureConfig: {
            assetUrl: "products/banana.png",
            key: "banana",
            isQuality: false,
        },
    },
    [ProductId.BananaQuality]: {
        name: "Banana Quality",
        textureConfig: {
            key: "banana",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Apple]: {
        name: "Apple",
        textureConfig: {
            assetUrl: "products/apple.png",
            key: "apple",
            isQuality: false,
        },
    },
    [ProductId.AppleQuality]: {
        name: "Apple Quality",
        textureConfig: {
            key: "apple",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Daisy]: {
        name: "Daisy",
        textureConfig: {
            assetUrl: "products/daisy.png",
            key: "daisy",
            isQuality: false,
        },
    },
    [ProductId.DaisyQuality]: {
        name: "Daisy Quality",
        textureConfig: {
            key: "daisy",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Strawberry]: {
        name: "Strawberry",
        textureConfig: {
            assetUrl: "products/strawberry.png",
            key: "strawberry",
            isQuality: false,
        },
    },
    [ProductId.StrawberryQuality]: {
        name: "Strawberry Quality",
        textureConfig: {
            key: "strawberry",
            useExisting: true,
            isQuality: true,
        },
    },
}

// Function to load all product assets
export const loadProductAssets = async (scene: Scene) => {
    // Load all product assets
    for (const productData of Object.values(productAssetMap)) {
        const { key, useExisting, assetUrl } = productData.textureConfig
        if (!useExisting) {
            if (!assetUrl) {
                throw new Error("Asset URL not found")
            }
            await fetchAsset({
                key,
                assetUrl,
                scene,
            })
        }
    }
}
