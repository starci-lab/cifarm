import { TutorialStep } from "@/modules/entities"
import { StacyAssetKey } from "../../assets"
import { AssetKey } from "node:sea"

export enum TutorialPhase {
    Start = "start",
}

export interface TutorialStepData {
    // message to display
    message: string,
    // is this the last step of the phase
    lastOfThisPhase: boolean,
    // phase
    phase: TutorialPhase,
    // texture key
    assetKey: AssetKey,
}

export const tutorialStepMap: Record<TutorialStep, TutorialStepData> = {
    [TutorialStep.StartWelcome]: {
        message: "Hey there, welcome to the farm! 😊 I'm Stacy, your super excited guide! Let's start growing some plants together! 🌱",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyWelcome
    },
    [TutorialStep.StartBuySeeds]: {
        message: "First things first, we need to grab some cute little seeds from the shop! 💖 Ready to pick your favorites?",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyBuySeeds
    },
    [TutorialStep.StartOpenInventory]: {
        message: "Alright, now let’s take a peek inside your inventory! 👜 You’ve got your seeds ready to go! 🌱 Open it up and let’s see what you’ve got!",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyOpenInventory
    },
    [TutorialStep.StartPlantSeed]: {
        message: "Time to plant that cute little seed! 🌱 Let’s make sure it’s nice and comfy in the soil.",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyPlantSeed
    },
    [TutorialStep.StartWaterCropAtStage1]: {
        message: "Water it, water it, water it! 💦 Your seed is thirsty, let’s give it some love.",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyWaterCrop
    },
    [TutorialStep.StartWaterCropAtStage2]: {
        message: "Aww, look at it grow! 🌱 Time to water it again and keep it strong! 💧",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyWaterCrop
    },
    [TutorialStep.StartToStage3]: {
        message: "Patience is key! 🌸 Let’s wait for the magic to happen and watch your crop grow up! 🌾",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyNormal
    },
    [TutorialStep.StartUsePesticide]: {
        message: "Uh oh, looks like we need to protect our crop! 🐞 Use some pesticide to keep it safe! 🛡️",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyUsePesitcide
    },
    [TutorialStep.StartUseHerbicide]: {
        message: "Now, let’s make sure no pesky weeds get in the way of your beautiful crop! 🌿 Time for some herbicide! 🌼",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyUseHerbicide
    },
    [TutorialStep.StartHarvestCrop]: {
        message: "Yay! It’s harvest time! 🎉 Let’s gather up that beautiful crop and enjoy the fruits of your hard work! 🍅",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyNormal
    },
    [TutorialStep.StartDeliverProduct]: {
        message: "Almost there! 🚛 Let’s deliver your crop and show off all your hard work! 🌟",
        lastOfThisPhase: false,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyNormal
    },
    [TutorialStep.StartGoodbye]: {
        message: "Goodbye for now, sweet farmer! 🌻 You did an amazing job!",
        lastOfThisPhase: true,
        phase: TutorialPhase.Start,
        assetKey: StacyAssetKey.StacyGoodbye
    },
}
