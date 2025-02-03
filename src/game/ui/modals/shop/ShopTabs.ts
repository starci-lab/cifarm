import { ShopTab } from "./types"
import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import { ContainerBaseConstructorParams } from "../../../types"
import { SCALE_TIME } from "@/game/constants"
import { onGameObjectClick } from "../../utils"

// use own scale values
const SCALE_DOWN_VALUE = 0.8
const SCALE_PEAK_VALUE = 1

export const defaultShopTab = ShopTab.Seeds

export class ShopTabs extends Phaser.GameObjects.Container {
    // private property to store the selected tab
    private selectedTab: ShopTab = defaultShopTab
    // private property to store the tab map
    private tabMap: Partial<Record<ShopTab, Phaser.GameObjects.Container>> = {}

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)
        // add the buttons
        for (const shopTab of Object.values(ShopTab)) {
            this.createTab(shopTab)
        }

        // thus, we need layout the tabs
        this.arrangeTabs()

        this.scene.events.on(EventName.SelectShopTab, (shopTab: ShopTab) => {
            // turn off the previous selected tab
            this.deactivateTab(this.selectedTab, true)
            // turn on the selected tab
            this.activateTab(shopTab, true)
            // set the selected tab
            this.selectedTab = shopTab
            // call layout again to reposition the tabs
        })
    }

    // helper method to handle activating the selected tab
    private activateTab(shopTab: ShopTab, animate: boolean = false) {
    // get the previous selected label
        const tab = this.tabMap[shopTab]
        if (!tab) {
            throw new Error("Previous selected tab is not found")
        }

        // activate the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: tab,
                scaleX: SCALE_PEAK_VALUE,
                scaleY: SCALE_PEAK_VALUE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            tab.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        }

        // get the icon tab on and off
        const [, iconTabOff] = tab.getAll() as Array<Phaser.GameObjects.Image>
        // set the icon tab off to be invisible
        iconTabOff.setVisible(false)

        return tab
    }

    // helper method to handle deactivating the selected tab
    private deactivateTab(shopTab: ShopTab, animate: boolean = false) {
    // get the container
        const tab = this.tabMap[shopTab]
        if (!tab) {
            throw new Error("tab is not found")
        }

        // deactivate the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: tab,
                scaleX: SCALE_DOWN_VALUE,
                scaleY: SCALE_DOWN_VALUE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            tab.setScale(SCALE_DOWN_VALUE, SCALE_DOWN_VALUE)
        }

        // get the icon tab on and off
        const [, iconTabOff] = tab.getAll() as Array<Phaser.GameObjects.Image>
        // set the icon tab off to be invisible
        iconTabOff.setVisible(true)
    }

    // method to create a button
    public createTab(shopTab: ShopTab = defaultShopTab) {
        const tab = this.scene.add.container(0, 0)
        // create the icon tab on
        const iconTabOn = this.scene.add
            .image(0, 0, BaseAssetKey.ModalShopIconTabOn)
            .setOrigin(0, 1)
        iconTabOn.setInteractive()
        // add the icon tab on to the container
        tab.add(iconTabOn)
        // create the icon tab off
        const iconTabOff = this.scene.add
            .image(0, 0, BaseAssetKey.ModalShopIconTabOff)
            .setOrigin(0, 1)
        // add the icon tab off to the container
        tab.add(iconTabOff)

        // store the container to the container tab
        this.tabMap[shopTab] = tab

        // method to handle when the tab is clicked
        iconTabOn.on("pointerdown", () => {
            onGameObjectClick({
                gameObject: iconTabOn,
                onClick: () => {
                    this.scene.events.emit(EventName.SelectShopTab, shopTab)
                },
                scene: this.scene,
                peakValue: SCALE_PEAK_VALUE
            })
        })

        // check active
        const isActive = shopTab === this.selectedTab
        if (isActive) {
            // activate the selected tab
            this.activateTab(shopTab)
        } else {
            // deactivate the selected tab
            this.deactivateTab(shopTab)
        }
        // return the tab
        return tab
    }

    // arrange the tabs
    private arrangeTabs() {
        let count = 0
        for (const [, value] of Object.entries(this.tabMap)) {
            // get the width of the tab
            const iconTabOn = value.getAt(0) as Phaser.GameObjects.Image
            const { width } = iconTabOn
            // set the position of the tab
            value.setPosition(count * (width - 60), 0)
            // add the tab to the container
            this.add(value)
            // increment the count
            count++
        }
        // reverse the tabs
        this.reverse()
    }
}
