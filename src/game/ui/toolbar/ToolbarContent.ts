import { SceneAbstract } from "@/game/SceneAbstract"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { Scene } from "phaser"

// number of items to show
const NUM_ITEMS = 4

export class ToolbarContent extends SceneAbstract {
    private startIndex = 0
    private endIndex = NUM_ITEMS - 1
    private slots: Record<number, Label> = {}
    // public to allow external access
    public itemSizer: Sizer

    constructor(scene: Scene) {
        super(scene)

        // create the toolbar background

        this.itemSizer = this.createItemSizer()
    }

    // create a sizer holds all the items
    private createItemSizer(): Sizer {
        const { height } = this.scene.game.scale

        const itemSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            originY: 1,
            space: {
                item: 40,
            },
            x: this.centerX - 5,
            y: this.centerY + height / 2 - 160,
        })

        // add the items to the sizer
        // left items
        const leftItemSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 15,
            },
            x: this.centerX,
            y: this.centerY + height / 2 - 160,
        })

        for (let i = 0; i < NUM_ITEMS - 1; i++) {
            const slot = this.scene.rexUI.add.label({
                width: 120,
                height: 120,
                align: "center",
                background: this.scene.add.rectangle(0, 0, 120, 120, 0x333333),
            })
            // create the avatar of each slot
            this.slots[i] = slot
            leftItemSizer.add(slot)
        }

        // right items
        const rightItemSizer = this.scene.rexUI.add.sizer({
            orientation: "x",
            space: {
                item: 15,
            },
            x: this.centerX,
            y: this.centerY + height / 2 - 160,
        })
        rightItemSizer.add(
            this.scene.rexUI.add.label({
                width: 120,
                height: 120,
                align: "center",
                background: this.scene.add.rectangle(0, 0, 120, 120, 0x333333),
            })
        )
        itemSizer.add(leftItemSizer).add(rightItemSizer)
        itemSizer.layout()
        return itemSizer
    }
}
