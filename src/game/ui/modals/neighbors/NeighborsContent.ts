import { BaseAssetKey } from "@/game/assets"
import { ContainerLiteBaseConstructorParams } from "@/game/types"
import { UserSchema } from "@/modules/entities"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ScrollablePanel, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "../../elements"
import { onGameObjectPress } from "../../utils"
import { defaultNeighborsTab } from "./NeighborsTabs"
import { NeighborsTab } from "./types"

export class NeighborsContent extends ContainerLite {
    private scrollablePanelMap: Partial<Record<NeighborsTab, ScrollablePanel>> = {}
    private neighbors: Array<UserSchema> = []
    private defaultItemCard: Sizer | undefined
    private selectedNeighborsTab: NeighborsTab = defaultNeighborsTab

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
        this.createScrollablePanel()
    }

    private createScrollablePanel() {
        const itemCards = this.createItemCards()

        const itemCardsSizer = this.scene.rexUI.add
            .sizer({
                orientation: "y",
                space: { item: 40 },
            })
            .addMultiple(itemCards)

        const scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                x: this.x,
                y: this.y,
                width: 750,
                height: 1000,
                scrollMode: "y",
                panel: {
                    child: itemCardsSizer,
                    mask: {
                        padding: 1,
                    },
                },
                mouseWheelScroller: {
                    focus: false,
                    speed: 2,
                },
            })
            .layout()

        this.addLocal(scrollablePanel)
        this.scrollablePanelMap[this.selectedNeighborsTab] = scrollablePanel
    }

    private createItemCards() {
        const itemList = [
            { assetKey: BaseAssetKey.UIModalShopIconAnimal, title: "Wheat Seed" },
            { assetKey: BaseAssetKey.UIModalShopIconAnimal, title: "Corn Seed" },
            { assetKey: BaseAssetKey.UIModalShopIconAnimal, title: "Rice Seed" },
            { assetKey: BaseAssetKey.UIModalShopIconAnimal, title: "Apple" },
            { assetKey: BaseAssetKey.UIModalShopIconAnimal, title: "Orange" },
            { assetKey: BaseAssetKey.UIModalShopIconAnimal, title: "Banana" },
            { assetKey: BaseAssetKey.UIModalShopIconAnimal, title: "Grapes" },
        ]

        return itemList.map(({ assetKey, title }) =>
            this.createItemCard({
                assetKey,
                title,
                onPress: () => console.log(`Clicked on ${title}`),
            })
        )
    }

    private createItemCard({ assetKey, title, onPress }: CreateItemCardParams) {
        const titleText = new BaseText({
            baseParams: { scene: this.scene, text: title, x: 0, y: 0 },
            options: { fontSize: 24 },
        })

        const button = this.scene.rexUI.add
            .label({
                text: titleText,
                align: "center",
            })
            .setInteractive()

        if (onPress) {
            button.on("pointerdown", () => {
                onGameObjectPress({
                    gameObject: button,
                    onPress,
                    scene: this.scene,
                })
            })
        }

        return this.scene.rexUI.add.sizer({ width: 300, height: 100 }).add(button, { align: "center" })
    }
}

export interface CreateItemCardParams {
  // the asset key of the item card
  assetKey: string;
  // title of the item
  title: string;
  // on click event
  onPress?: () => void;
}
