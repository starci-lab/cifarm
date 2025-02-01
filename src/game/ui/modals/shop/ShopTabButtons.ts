import { Scene } from "phaser"
import { Buttons, Label } from "phaser3-rex-plugins/templates/ui/ui-components"
import { ShopTab } from "./types"
import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"

const SELECTED_SCALE = 1
const UNSELECTED_SCALE = 0.8

export class ShopTabButtons extends Buttons {
    // private property to store the selected tab
    private selectedTab: ShopTab = ShopTab.Seeds
    // private property to store the label map
    private labelMap: Partial<Record<ShopTab, Label>> = {}

    constructor(scene: Scene, config?: Buttons.IConfig) {
        super(scene, {
            orientation: "x",
            space: { item: -50 },
            align: "bottom",
            sizerEvents: false,
            expand: false,
            ...config
        })

        // add the buttons
        for (const shopTab of Object.values(ShopTab)) {
            this.addButton(this.createButton(shopTab))
        }

        this.on(EventName.ShopTabSelected, (shopTab: ShopTab) => {
            // turn off the previous selected tab
            this.turnOff(this.selectedTab, true)
            // turn on the selected tab
            this.turnOn(shopTab, true)
            // set the selected tab
            this.selectedTab = shopTab
            //call layout again to reposition the tabs
            this.layout()
        })
    }

    // helper method to handle turn off the previous selected tab
    private turnOn(shopTab: ShopTab, animate: boolean = false) {
        // get the previous selected label
        const label = this.labelMap[shopTab]
        if (!label) {
            throw new Error("Previous selected label is not found") 
        }

        // turn on the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: label,
                scaleX: SELECTED_SCALE,
                scaleY: SELECTED_SCALE,
                duration: 500,
                ease: "Back",
            })
        } else {
            label.setScale(SELECTED_SCALE, SELECTED_SCALE)
        }
        const image = label.getChildren().at(0) as Phaser.GameObjects.Image | undefined
        if (image) {
            image.setDepth(1)
        }
        //set other tabs to depth 0
        return label
    }

    // helper method to handle turn on the selected tab
    private turnOff(shopTab: ShopTab, animate: boolean = false) {
        // get the selected label
        const label = this.labelMap[shopTab]
        if (!label) {
            throw new Error("Selected label is not found") 
        }

        // turn off the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: label,
                scaleX: UNSELECTED_SCALE,
                scaleY: UNSELECTED_SCALE,
                duration: 500,
                ease: "Back",
            })
        } else {
            label.setScale(UNSELECTED_SCALE, UNSELECTED_SCALE)
        }
        const image = label.getChildren().at(0) as Phaser.GameObjects.Image | undefined
        if (image) {
            image.setDepth(0)
        }
        return label
    }


    // method to create a button
    public createButton(shopTab: ShopTab = ShopTab.Seeds) {
        // get the icon tab on width and height
        const iconTabOn = this.scene.textures
            .get(BaseAssetKey.ModalShopIconTabOn)
            .getSourceImage()
        const { width: iconTabWidth, height: iconTabHeight } = iconTabOn
        // create the label
        const label = this.scene.rexUI.add.label({
            width: iconTabWidth,
            height: iconTabHeight,
            background: this.scene.add.image(0, 0, BaseAssetKey.ModalShopIconTabOn),
        })

        // store the label
        this.labelMap[shopTab] = label
        
        // method to handle when the button is clicked
        label.on("pointerdown", () => {
            const scaleTime = 500
            // set interactive to false
            if (label.input) {
                label.input.enabled = false
            }
            // wait for the scale to finish
            this.scene.time.delayedCall(scaleTime, () => {
                // set interactive to true
                if (label.input) {
                    label.input.enabled = true
                }
            })
            this.emit(EventName.ShopTabSelected, shopTab)
        })
        // return the label
        return label
    }

    // method to call when the buttons are layouted, to ensure tabs in correct state
    public initialize() {
        // loop through the label map
        for (const [shopTab, label] of Object.entries(this.labelMap)) {
            // check if the label is not found
            if (!label) {
                throw new Error("Label is not found")
            }

            // check if the shop tab is the selected tab
            if (shopTab === this.selectedTab) {
                // turn on the selected tab
                this.turnOn(shopTab as ShopTab)
            } else {
                // turn off the selected tab
                this.turnOff(shopTab as ShopTab)
            }
        }
    }
}
