import { BaseAssetKey } from "@/game/assets"
import { EventName } from "@/game/event-bus"
import { ContainerBaseConstructorParams } from "../../../types"
import { BaseText } from "../../elements"
import { onGameObjectPress } from "../../utils"
import { NeighborsTab, tabs } from "./types"
import { SCALE_TIME } from "@/game/constants"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"

// use own scale values
const PADDING_X = 100
const SCALE_DOWN_VALUE = 0.8
const SCALE_PEAK_VALUE = 1

export const defaultNeighborsTab = NeighborsTab.Random

export class NeighborsTabs extends ContainerLite {
    // private property to store the selected tab
    private selectedTab: NeighborsTab = defaultNeighborsTab
    // private property to store the tab map
    private tabMap: Partial<Record<NeighborsTab, Phaser.GameObjects.Container>> = {}

    constructor({ scene, x, y }: ContainerBaseConstructorParams) {
        super(scene, x, y)
        // add the buttons
        for (const neighborsTab of Object.values(NeighborsTab)) {
            this.createTab(neighborsTab)
        }

        // thus, we need layout the tabs
        this.arrangeTabs()

        this.scene.events.on(EventName.SelectNeighborsTab, (neighborsTab: NeighborsTab) => {
            // turn off the previous selected tab
            this.deactivateTab(this.selectedTab)
            // turn on the selected tab
            this.activateTab(neighborsTab)
            // set the selected tab
            this.selectedTab = neighborsTab
            // call layout again to reposition the tabs
        })
    }

    // helper method to handle activating the selected tab
    private activateTab(neighborsTab: NeighborsTab, animate: boolean = false) {
    // get the previous selected label
        const tab = this.tabMap[neighborsTab]
        if (!tab) {
            throw new Error("Previous selected tab is not found")
        }

        if (animate) {
            this.scene.tweens.add({
                //tabText
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
    private deactivateTab(neighborsTab: NeighborsTab, animate = false) {
    // get the container
        const tab = this.tabMap[neighborsTab]
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
    public createTab(neighborsTab: NeighborsTab = defaultNeighborsTab) {
        const tab = this.scene.add.container(0, 0)
    
        // Get the total container width (assuming parent container has a set width)
        const totalWidth = this.scene.scale.width - PADDING_X
        const tabWidth = totalWidth / 2
    
        // Create the active tab icon (background)
        const iconTabOn = this.scene.add
            .image(0, 0, BaseAssetKey.ModalShopItemCard)
            .setOrigin(0.5, 0.5)
            .setDisplaySize(tabWidth, 100)
    
        iconTabOn.setInteractive()
    
        // Create the inactive tab icon (background)
        const iconTabOff = this.scene.add
            .image(0, 0, BaseAssetKey.ModalInventoryIconTabOff)
            .setOrigin(0.5, 0.5)
            .setDisplaySize(tabWidth, 100)
    
        // Create the text
        const tabText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0, // Centered in the tab
                y: 0,
                text: tabs[neighborsTab].text
            },
            options: {
                enableStroke: true,
                fontSize: 32,
            },
        })
    
        // Center the text
        tabText.setPosition(0, 0)
    
        // Add everything to the container
        tab.add(iconTabOn)
        tab.add(iconTabOff)
        tab.add(tabText)
    
        // Store the container in the tab map
        this.tabMap[neighborsTab] = tab
    
        // Handle clicks
        iconTabOn.on("pointerdown", () => {
            onGameObjectPress({
                gameObject: iconTabOn,
                animate: false,
                onPress: () => {
                    this.scene.events.emit(EventName.SelectNeighborsTab, neighborsTab)
                },
                scene: this.scene,
            })
        })
    
        // Activate or deactivate the tab based on selection
        if (neighborsTab === this.selectedTab) {
            this.activateTab(neighborsTab)
        } else {
            this.deactivateTab(neighborsTab)
        }
    
        return tab
    }
    

    // arrange the tabs
    private arrangeTabs() {
        let count = 0
        const totalWidth = this.scene.scale.width - PADDING_X
        const tabWidth = totalWidth / 2
    
        for (const [, value] of Object.entries(this.tabMap)) {
            // Set position of each tab
            value.setPosition(count * (tabWidth + 2), 0)
    
            // Add the tab to the container
            this.addLocal(value)
            this.x -= tabWidth * (1/3) + 10
            this.x += PADDING_X / 2
            count++
        }
    }
    
}
