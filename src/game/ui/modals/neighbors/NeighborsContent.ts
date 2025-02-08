import { BaseAssetKey } from "@/game/assets"
import { SizerBaseConstructorParams } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { ScrollablePanel, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseText } from "../../elements"
import { NeighborsTab } from "./types"
import { defaultNeighborsTab } from "./NeighborsTabs"
import { UserEntity } from "@/modules/entities"
import { onGameObjectClick } from "../../utils"

export class NeighborsContent extends BaseSizer {
    private scrollablePanelMap: Partial<Record<NeighborsTab, ScrollablePanel>> = {}
    private neighbors: Array<UserEntity> = []
    private defaultItemCard: Sizer | undefined
    private selectedNeighborsTab: NeighborsTab = defaultNeighborsTab

    constructor({ scene, x, y, height, width, config }: SizerBaseConstructorParams) {
        super(scene, x, y, height, width, config)
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

        this.add(scrollablePanel)
        this.scrollablePanelMap[this.selectedNeighborsTab] = scrollablePanel
    }

    private createItemCards() {
        const itemList = [
            { assetKey: BaseAssetKey.ModalShopIconAnimal, title: "Wheat Seed" },
            { assetKey: BaseAssetKey.ModalShopIconAnimal, title: "Corn Seed" },
            { assetKey: BaseAssetKey.ModalShopIconAnimal, title: "Rice Seed" },
            { assetKey: BaseAssetKey.ModalShopIconAnimal, title: "Apple" },
            { assetKey: BaseAssetKey.ModalShopIconAnimal, title: "Orange" },
            { assetKey: BaseAssetKey.ModalShopIconAnimal, title: "Banana" },
            { assetKey: BaseAssetKey.ModalShopIconAnimal, title: "Grapes" },
        ]

        return itemList.map(({ assetKey, title }) =>
            this.createItemCard({
                assetKey,
                title,
                onClick: () => console.log(`Clicked on ${title}`),
            })
        )
    }

    private createItemCard({ assetKey, title, onClick }: CreateItemCardParams) {
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

        if (onClick) {
            button.on("pointerdown", () => {
                onGameObjectClick({
                    gameObject: button,
                    onClick,
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
  onClick?: () => void;
}
