import { TutorialStep } from "@/modules/entities"

export interface TutorialScript {
  text: string;
  image: string;
}

type TutorialScripts = Record<TutorialStep, Array<TutorialScript>>;

export const tutorialScripts: TutorialScripts = {
    [TutorialStep.Start]: [
        {
            text: "Welcome to CiFarm! CiFarm is a farming and thief-based play-to-earn game where you can earn big by growing crops and stealing from others.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        },
        {
            text: "CiFarm is launching its first Act: the <span style='color:rgb(163, 228, 65);'>Golden Sprout Festival</span>. This Act uses USDC, and you can earn real USDC rewards throughout the season.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        },
        {
            text: "Now, I'll teach you how to buy seeds from the shop. Please click the Shop button to continue.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        }
    ],
    [TutorialStep.OpenShopModal]: [
        {
            text: "Once you're at the shop, you can purchase seeds and other items. Try to purchase some seeds. After that, check the inventory to see your seeds.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        }
    ],
    [TutorialStep.OpenInventoryModal]: [
        {
            text: "Try to put the seeds into the toolbar. You can do this by clicking on the seed in the inventory and then clicking on the toolbar.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        }
    ],
    [TutorialStep.Plant]: [
        {
            text: "Now, you can plant the seeds. Click on the seed in the toolbar, then click on an empty tile to plant the seed.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        }
    ],
    [TutorialStep.OpenNeighborsModal]: [
        {
            text: "This is the neighbor's information. You can find, search, or visit their farm.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        }
    ],
    [TutorialStep.AtNeighbor]: [
        {
            text: "This is your neighbor's farm. You can see their garden.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        },
        {
            text: "You can help by watering, using pesticide or herbicide on their plants, and curing their animals.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        },
        {
            text: "You can steal from them. This is a major way to maximize your earnings. You can steal from anyone whose level is near or lower than yours.",
            image: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/tutorial.png"
        }
    ]
}