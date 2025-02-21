import { Scene } from "phaser"
import { TextureConfig } from "./types"
import { ProductId } from "@/modules/entities"

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
            assetUrl: "products/egg.png",
            key: "egg",
        },
    },
    [ProductId.EggQuality]: {
        name: "Egg Quality",
        textureConfig: {
            assetUrl: "products/egg.png",
            key: "egg",
            useExisting: true,
            isQuality: true,
        },
    },
    [ProductId.Milk]: {
        name: "Milk",
        textureConfig: {
            assetUrl: "products/milk.png",
            key: "milk",
            isQuality: false,
        },
        
    },
    [ProductId.MilkQuality]: {
        name: "Milk Quality",
        textureConfig: {
            assetUrl: "products/milk.png",
            key: "milk",
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
            assetUrl: "products/carrot.png",
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
            assetUrl: "products/potato.png",
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
            assetUrl: "products/cucumber.png",
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
            assetUrl: "products/pineapple.png",
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
            assetUrl: "products/watermelon.png",
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
            assetUrl: "products/bell-pepper.png",
            key: "bell-pepper",
            useExisting: true,
            isQuality: true,
        },
    },
}

// Function to load inventory assets in Phaser scene
export const loadProductAssets = (scene: Scene) => {
    Object.keys(productAssetMap).forEach((productId) => {
        const _productId = productId as ProductId
        const productData = productAssetMap[_productId]

        if (!productData) {
            throw new Error(
                `Product data not found for productId: ${productId}`
            )
        }

        const { key, assetUrl, useExisting } = productData.textureConfig
        if (useExisting) {
            return
        }
        scene.load.image(key, assetUrl)
    })
}
