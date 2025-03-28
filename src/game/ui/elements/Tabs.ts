import { GRAY_TINT_COLOR, SCALE_TIME } from "@/game/constants"
import { BaseAssetKey } from "../../assets"
import {
    ConstructorParams,
    ContainerLiteBaseConstructorParams,
} from "../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import {
    Label,
    ScrollablePanel,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"
import { SceneEventEmitter, SceneEventName, SelectTabMessage } from "../../events"
import { IconOffsets } from "./types"

export interface BaseTab {
  tabKey: string;
  iconKey: string;
  onPress?: (pointer: Phaser.Input.Pointer) => void;
  offsets?: IconOffsets;
  scale?: number;
}

export interface TabsOptions {
  name: string;
  tabs: Array<BaseTab>;
  defaultTab: string;
  tabsX?: number;
  tabsY?: number;
}

export interface TabData {
    iconKey: string,
    offsets?: {
        x: number,
        y: number,
    },
    scale?: number,
}

// Helper constants for scaling
const SCALE_DOWN_VALUE = 0.8
const SCALE_PEAK_VALUE = 1

export class Tabs extends ContainerLite {
    private tabSizer: Sizer
    private selectedTab: string
    private tabMap: Record<string, ContainerLite> = {}
    private tabWidth: number
    private tabHeight: number
    private scrollablePanel: ScrollablePanel
    private tabContainer: ContainerLite
    private slat: Phaser.GameObjects.Image
    constructor({
        baseParams: { scene, x, y, width, height, children },
        options,
    }: ConstructorParams<ContainerLiteBaseConstructorParams, TabsOptions>) {
        const tabSourceImage = scene.textures
            .get(BaseAssetKey.UITabFrame)
            .getSourceImage() as HTMLImageElement
        const slatSourceImage = scene.textures
            .get(BaseAssetKey.UITabSlat)
            .getSourceImage() as HTMLImageElement
        super(scene, x, y, width, height ?? tabSourceImage.height, children)
        if (!options) {
            throw new Error("Tabs requires options")
        }
        const { defaultTab, tabs, name: tabsName, tabsX = -400, tabsY = 0 } = options
        this.tabContainer = scene.rexUI.add.container(tabsX, tabsY - slatSourceImage.height + 10)
        this.tabWidth = tabSourceImage.width
        this.tabHeight = tabSourceImage.height
        this.selectedTab = defaultTab
        this.tabSizer = scene.rexUI.add.sizer()
        for (const tab of tabs) {
            this.createTab(tab)
        }

        this.tabSizer.layout()

        this.scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                x: 0,
                y: 0,
                originX: 0,
                originY: 1,
                height: this.tabHeight,
                width,
                scrollMode: "horizontal",
                panel: {
                    child: this.tabSizer,
                    mask: {
                        padding: 1,
                    },
                },
            })
            .layout()
        this.scrollablePanel
            .setChildrenInteractive({
                targets: [this.tabSizer],
            })
            .on(
                "child.click",
                (child: ContainerLite, pointer: Phaser.Input.Pointer) => {
                    const tabKey = child.getData(TabDataKey.Tab)
                    SceneEventEmitter.emit(SceneEventName.SelectTab, {
                        tabKey,
                        name: tabsName,
                    })
                    const onPress = tabs.find((tab) => tab.tabKey === tabKey)?.onPress
                    if (onPress) {
                        onPress(pointer)
                    }
                }
            )
        this.tabContainer.addLocal(this.scrollablePanel)
        this.addLocal(this.tabContainer)
        const center = this.getCenter()
        this.slat = scene.add.image(center.x, center.y, BaseAssetKey.UITabSlat).setOrigin(0.5, 1)
        this.addLocal(this.slat)

        SceneEventEmitter.on(
            SceneEventName.SelectTab,
            ({ tabKey, name }: SelectTabMessage) => {
                if (tabsName !== name) {
                    return
                }
                // turn off the previous selected tab
                this.deactivateTab(this.selectedTab, true)
                // turn on the selected tab
                this.activateTab(tabKey, true)
                // set the selected tab
                this.selectedTab = tabKey
                // call layout again to reposition the tabs
            }
        )
    }

    public getHeight() {
        return this.tabHeight + this.slat.height
    }

    // method to create a button
    public createTab({ iconKey, tabKey, offsets, scale }: BaseTab) {
        const tab = this.scene.rexUI.add.container(
            0,
            0,
            this.tabWidth,
            this.tabHeight
        )
        const innerContainer = this.scene.rexUI.add.container(
            0,
            this.tabHeight / 2,
            this.tabWidth,
            this.tabHeight
        )
        // create the icon tab on
        const iconTabOnBackground = this.scene.add.image(
            0,
            0,
            BaseAssetKey.UITabFrame
        )
        // iconTabOn.setInteractive()
        // add the icon tab on to the container
        // Add icon
        const iconBackground = this.scene.add.image(0, 0, iconKey)
        const icon = this.scene.rexUI.add
            .label({
                x: offsets?.x,
                y: offsets?.y,
                background: iconBackground,
                width: iconBackground.width * (scale || 1),
                height: iconBackground.height * (scale || 1),
            })
            .layout()
        const label = this.scene.rexUI.add
            .label({
                background: iconTabOnBackground,
                width: iconTabOnBackground.width,
                height: iconTabOnBackground.height,
                originY: 1,
                originX: 0.5,
                align: "center",
                icon,
            })
            .layout()
        innerContainer.addLocal(label)
        // method to handle when the tab is clicked
        tab.setData(TabDataKey.Tab, tabKey)
        // // check active
        const isActive = tabKey === this.selectedTab
        if (isActive) {
            // activate the selected tab
            innerContainer.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        } else {
            // deactivate the selected tab
            innerContainer.setScale(SCALE_DOWN_VALUE, SCALE_DOWN_VALUE)
            iconTabOnBackground.setTint(GRAY_TINT_COLOR)
            iconBackground.setTint(GRAY_TINT_COLOR)
        }
        //return the tab
        tab.pinLocal(innerContainer, {
            syncScale: false,
        })
        this.tabMap[tabKey] = tab
        this.tabSizer.add(tab)
        return tab
    }

    // helper method to handle activating the selected tab
    private activateTab(tabKey: string, animate: boolean = false) {
        const innerContainer = this.tabMap[
            tabKey
        ]?.getChildren()[0] as ContainerLite
        if (!innerContainer) {
            throw new Error("Inner container is not found")
        }
        // activate the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: innerContainer,
                scaleX: SCALE_PEAK_VALUE,
                scaleY: SCALE_PEAK_VALUE,
                duration: SCALE_TIME,
                ease: "Back",
            })
            //tab.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        } else {
            innerContainer.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        }
        // get the icon tab on and off
        this.updateTint(innerContainer, true)
    }

    // helper method to handle deactivating the selected tab
    private deactivateTab(tabKey: string, animate: boolean = false) {
        const innerContainer = this.tabMap[
            tabKey
        ]?.getChildren()[0] as ContainerLite
        if (!innerContainer) {
            throw new Error("Inner container is not found")
        }

        //deactivate the selected tab
        if (animate) {
            this.scene.tweens.add({
                targets: innerContainer,
                scaleX: SCALE_DOWN_VALUE,
                scaleY: SCALE_DOWN_VALUE,
                duration: SCALE_TIME,
                ease: "Back",
            })
            // tab.setScale(SCALE_PEAK_VALUE, SCALE_PEAK_VALUE)
        } else {
            innerContainer.setScale(SCALE_DOWN_VALUE, SCALE_DOWN_VALUE)
        }
        //tab.setScale(SCALE_DOWN_VALUE, SCALE_DOWN_VALUE)

        // get the icon tab on and off
        this.updateTint(innerContainer, false)
    }

    private updateTint(innerContainer: ContainerLite, removeTint?: boolean) {
        const [label] = (innerContainer as ContainerLite).getChildren()
        const [background, icon] = (label as Label).getChildren()
        const backgroundImage = background as Phaser.GameObjects.Image
        const iconImage = (
      icon as Label
    ).getChildren()[0] as Phaser.GameObjects.Image
        if (removeTint) {
            backgroundImage.clearTint()
            iconImage.clearTint()
        } else {
            backgroundImage.setTint(GRAY_TINT_COLOR)
            iconImage.setTint(GRAY_TINT_COLOR)
        }
    }
}

export enum TabDataKey {
  Tab = "tab",
}
