import { BaseAssetKey } from "@/game/assets"
import { SCALE_TIME } from "@/game/constants"
import { EventName } from "@/game/event-bus"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { ContainerLiteBaseConstructorParams } from "../../../types"
import { ShopTab, tabs } from "./types"
import { BadgeLabel } from "phaser3-rex-plugins/templates/ui/ui-components"

// use own scale values
const SCALE_DOWN_VALUE = 0.8
const SCALE_PEAK_VALUE = 1

export const defaultShopTab = ShopTab.Seeds

export class ShopTabs extends ContainerLite {
    // private property to store the selected tab
    private selectedTab: ShopTab = defaultShopTab
    // private property to store the tab map
    private tabMap: Partial<Record<ShopTab, ContainerLite>> = {}

    constructor({ scene, x, y, width, height, children }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)
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
            //tab.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        } else {
            tab.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        }

        // get the icon tab on and off
        const [, iconTabOff] = tab.getChildren() as Array<Phaser.GameObjects.Image>
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

        //deactivate the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: tab,
                scaleX: SCALE_DOWN_VALUE,
                scaleY: SCALE_DOWN_VALUE,
                duration: SCALE_TIME,
                ease: "Back",
            })
            // tab.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        } else {
            tab.setScale(SCALE_DOWN_VALUE, SCALE_DOWN_VALUE)
        }
        //tab.setScale(SCALE_DOWN_VALUE, SCALE_DOWN_VALUE)

        // get the icon tab on and off
        const [, iconTabOff] = tab.getChildren() as Array<Phaser.GameObjects.Image>
        // set the icon tab off to be invisible
        iconTabOff.setVisible(true)
    }

    // method to create a button
    public createTab(shopTab: ShopTab = defaultShopTab) {
        const tab = this.scene.rexUI.add.container(0, 0)
        // create the icon tab on
        const iconTabOnBackground = this.scene.add
            .image(0, 0, BaseAssetKey.UIModalShopIconTabOn)
        // iconTabOn.setInteractive()
        // add the icon tab on to the container
        // Add icon
        const iconBackground = this.scene.add.image(0, 0, tabs[shopTab].iconKey)
        const icon = this.scene.rexUI.add.label({
            x: tabs[shopTab].offSets?.x,
            y: tabs[shopTab].offSets?.y,
            background: iconBackground,
            width: iconBackground.width * (tabs[shopTab].scale || 1),
            height: iconBackground.height * (tabs[shopTab].scale || 1),
        }).layout()
        const badgeLabel = this.scene.rexUI.add.label({
            background: iconTabOnBackground,
            width: iconTabOnBackground.width,
            height: iconTabOnBackground.height,
            originY: 1,
            originX: 0,
            align: "center",
            icon
        }).layout()
        tab.addLocal(badgeLabel)
        // create the icon tab off
        const iconTabOff = this.scene.add
            .image(0, 0, BaseAssetKey.UIModalShopIconTabOff)
            .setOrigin(0, 1).setVisible(false)
        // store the container to the container tab
        this.tabMap[shopTab] = tab

        // method to handle when the tab is clicked
        badgeLabel.setInteractive().on("pointerdown", () => {
            this.scene.events.emit(EventName.SelectShopTab, shopTab)
        })

        // check active
        const isActive = shopTab === this.selectedTab
        if (isActive) {
            // activate the selected tab
            tab.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        } else {
            // deactivate the selected tab
            tab.setScale(SCALE_DOWN_VALUE, SCALE_DOWN_VALUE)
            iconTabOff.setVisible(true)
        }
        // return the tab
        tab.addLocal(iconTabOff)
        return tab
    }

    // arrange the tabs
    private arrangeTabs() {
        let count = 0
        for (const [, value] of Object.entries(this.tabMap)) {
            // get the width of the tab
            const iconTabOn = value.getChildren()[0] as BadgeLabel
            const { width } = iconTabOn
            // set the position of the tab
            value.setPosition(count * (width - 60), 0)
            // add the tab to the container
            this.addLocal(value)
            // increment the count
            count++
        }
 
        // reverse the order of the tabs, but not the last one
        for (let i = 0; i < count - 1; i++) {
            const [, value] = Object.entries(this.tabMap)[i]
            this.sendChildToBack(value)
        }
    }
}
