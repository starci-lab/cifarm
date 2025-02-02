
import { EventName } from "@/game/event-bus"
import { Scene } from "phaser"
import { InventoryTab } from "./types"

const SELECTED_SCALE = 1.1
const UNSELECTED_SCALE = 0.9
const SCALE_TIME = 500

export class InventoryTabs extends Phaser.GameObjects.Container {
    // private property to store the selected tab
    private selectedTab: InventoryTab = InventoryTab.Seeds
    // private property to store the tab map
    private tabMap: Partial<Record<InventoryTab, Phaser.GameObjects.Container>> = {}

    private inventoryCell: Phaser.GameObjects.Container | undefined
    private inventoryCellQuantity: Phaser.GameObjects.Image | undefined
    
    constructor(scene: Scene, x: number, y: number)
    {
        super(scene, x, y)
        // add the buttons
        for (const inventoryTab of Object.values(InventoryTab)) {
            // this.addTab(inventoryTab)
        }

        // thus, we need layout the tabs
        this.layout()

        this.on(EventName.InventoryTabSelected, (InventoryTab: InventoryTab) => {
            // turn off the previous selected tab
            this.turnOff(this.selectedTab, true)
            // turn on the selected tab
            this.turnOn(InventoryTab, true)
            // set the selected tab
            this.selectedTab = InventoryTab
            //call layout again to reposition the tabs
        })
    }

    // helper method to handle turn off the previous selected tab
    private turnOn(InventoryTab: InventoryTab, animate: boolean = false) {
        // get the previous selected label
        const tab = this.tabMap[InventoryTab]
        if (!tab) {
            throw new Error("Previous selected tab is not found")
        }

        // turn on the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: tab,
                scaleX: SELECTED_SCALE,
                scaleY: SELECTED_SCALE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            tab.setScale(SELECTED_SCALE, SELECTED_SCALE)
        }

        // get the icon tab on and off
        const [, iconTabOff] = tab.getAll() as Array<Phaser.GameObjects.Image>
        // set the icon tab off to be invisible
        iconTabOff.setVisible(false)

        return tab
    }

    // helper method to handle turn on the selected tab
    private turnOff(InventoryTab: InventoryTab, animate: boolean = false) {
        // get the container
        const tab = this.tabMap[InventoryTab]
        if (!tab) {
            throw new Error("tab is not found")
        }

        // turn off the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: tab,
                scaleX: UNSELECTED_SCALE,
                scaleY: UNSELECTED_SCALE,
                duration: SCALE_TIME,
                ease: "Back",
            })
        } else {
            tab.setScale(UNSELECTED_SCALE, UNSELECTED_SCALE)
        }

        // get the icon tab on and off
        const [, iconTabOff] = tab.getAll() as Array<Phaser.GameObjects.Image>
        // set the icon tab off to be invisible
        iconTabOff.setVisible(true)
    }

    // method to create a button
    // public addTab(inventoryTab: InventoryTab = InventoryTab.Seeds) {
    //     const tab = this.scene.add.container(0, 0)
    //     // create the icon tab on
    //     const iconTabOn = this.scene.add.image(0, 0, BaseAssetKey.ModalInventoryIconTabOn).setOrigin(0, 1)
    //     iconTabOn.setInteractive()
    //     //add the icon tab on to the container
    //     tab.add(iconTabOn)
    //     // create the icon tab off
    //     const iconTabOff = this.scene.add.image(0, 0, BaseAssetKey.ModalInventoryIconTabOff).setOrigin(0, 1)
    //     //add the icon tab off to the container
    //     tab.add(iconTabOff)
        
    //     // store the container to the container tab
    //     this.tabMap[InventoryTab] = tab
        
    //     // method to handle when the tab is clicked
    //     iconTabOn.on("pointerdown", () => {
    //         // set interactive to false
    //         if (tab.input) {
    //             tab.input.enabled = false
    //         }
    //         // wait for the scale to finish
    //         this.scene.time.delayedCall(SCALE_TIME, () => {
    //             // set interactive to true
    //             if (tab.input) {
    //                 tab.input.enabled = true
    //             }
    //         })
    //         this.emit(EventName.InventoryTabSelected, InventoryTab)
    //     })

    //     // check active 
    //     const isActive = InventoryTab === this.selectedTab
    //     if (isActive) {
    //         // turn on the selected tab
    //         this.turnOn(InventoryTab)
    //     } else {
    //         // turn off the selected tab
    //         this.turnOff(InventoryTab)
    //     }
    //     // return the tab
    //     return tab
    // }

    // layout the tabs
    private layout() {  
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
