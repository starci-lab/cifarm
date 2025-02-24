import {
    ConstructorParams,
    ContainerLiteBaseConstructorParams,
} from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseText, TextColor } from "./BaseText"
import { BaseAssetKey } from "@/game/assets"
import { onGameObjectPress } from "../utils"
import { XButton } from "./XButton"
import { BaseTabs, BaseTabsOptions } from "./BaseTabs"

export enum Background {
  Large = "large",
  Medium = "medium",
  XLarge = "xlarge",
  Small = "small",
  XXLarge = "xxlarge",
}

export interface BackgroundData {
    backgroundAssetKey: BaseAssetKey
    containerAssetKey?: BaseAssetKey
    wrapperContainerAssetKey?: BaseAssetKey
    tabContainerAssetKey?: BaseAssetKey
    containerOffsetY?: number
    containerToWrapperOffsetY?: number
}

const map: Record<Background, BackgroundData> = {
    [Background.Large]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundLarge,
        containerAssetKey: BaseAssetKey.UIBackgroundLargeContainer,
        wrapperContainerAssetKey: BaseAssetKey.UIBackgroundLargeWrapperContainer,
        containerOffsetY: -80,
        containerToWrapperOffsetY: -10,
    },
    [Background.Medium]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundMedium,
        // containerAssetKey: BaseAssetKey.UIBackgroundMediumContainer,
        containerAssetKey:  BaseAssetKey.UIBackgroundMediumContainer,
        containerOffsetY: -100,
    },
    [Background.XLarge]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundXLarge,
        wrapperContainerAssetKey: BaseAssetKey.UIBackgroundXLargeWrapperContainer,
        // containerAssetKey: BaseAssetKey.UIBackgroundXLargeContainer,
        containerOffsetY: -100,
    },
    [Background.Small]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundSmall,
        containerAssetKey: BaseAssetKey.UIBackgroundSmallContainer,
        containerOffsetY: -60,
    },
    [Background.XXLarge]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundXXLarge,
        tabContainerAssetKey: BaseAssetKey.UIBackgroundXXLargeTabContainer,
        wrapperContainerAssetKey: BaseAssetKey.UIBackgroundXXLargeWrapperContainer,
        containerOffsetY: -100,
    },
}

export interface ModalBackgroundOptions {
  background: Background;
  title: string;
  onXButtonPress: (xButton: XButton) => void;
  titleFontSize?: number;
  container?: {
    showWrapperContainer?: boolean;
    showContainer?: boolean;
  },
  align?: "center" | "top" | "bottom";
  tabs?: {
    width: number;
    options: BaseTabsOptions
    tabContainerOffsetY?: number
  }
}
export class ModalBackground extends ContainerLite {
    public xButton: XButton
    private titleText: BaseText
    public backgroundImage: Phaser.GameObjects.Image
    public uiContainer: ContainerLite
    public container: ContainerLite | undefined
    public containerImage: Phaser.GameObjects.Image | undefined
    public wrapperContainer: ContainerLite | undefined
    public wrapperContainerImage: Phaser.GameObjects.Image | undefined
    private tabs: BaseTabs | undefined
    public tabContainer: ContainerLite | undefined
    public tabContainerImage: Phaser.GameObjects.Image | undefined
    public containerOffsetY: number
    public wrapperContainerOffsetY: number
    constructor({
        baseParams: { scene, children, height, width, x, y },
        options,
    }: ConstructorParams<
    ContainerLiteBaseConstructorParams,
    ModalBackgroundOptions
  >) {
        if (!options) {
            throw new Error("ModalBackground requires options")
        }
        const { background, title, onXButtonPress, titleFontSize = 48, container: containerConfig, tabs: tabsConfig, align = "top" } = options
        super(scene, x, y, width, height, children)
        const { backgroundAssetKey, containerAssetKey, containerOffsetY = 0, tabContainerAssetKey, wrapperContainerAssetKey, containerToWrapperOffsetY = -5 } = map[background]
        this.containerOffsetY = containerOffsetY
        this.wrapperContainerOffsetY = containerToWrapperOffsetY
        this.backgroundImage = this.scene.add.image(0, 0, backgroundAssetKey).setOrigin(0.5, 1)
        this.uiContainer = this.scene.rexUI.add.container(0, 0)
        this.addLocal(this.uiContainer)
        this.uiContainer.addLocal(this.backgroundImage)

        if (containerConfig) {
            const { showContainer = true, showWrapperContainer = true } = containerConfig
            if (showWrapperContainer) {
                if (!wrapperContainerAssetKey) {
                    throw new Error("WrapperContainerAssetKey is required")
                }
                this.wrapperContainerImage = this.scene.add.image(0, 0, wrapperContainerAssetKey).setOrigin(0.5, 1)
                this.wrapperContainer = this.scene.rexUI.add.container(0, containerOffsetY)
                this.wrapperContainer.addLocal(this.wrapperContainerImage)
                this.uiContainer.addLocal(this.wrapperContainer)
            } 
            if (showContainer) {
                if (tabsConfig) {
                    if (!tabContainerAssetKey) {
                        throw new Error("TabContainerAssetKey is required")
                    }
                    this.tabContainerImage = this.scene.add.image(0, 0, tabContainerAssetKey).setOrigin(0.5, 1)
                    this.tabContainer = this.scene.rexUI.add.container(0, containerToWrapperOffsetY)
                    this.tabContainer.addLocal(this.tabContainerImage)
                    this.wrapperContainer?.addLocal(this.tabContainer)
                }
                else {
                    if (!containerAssetKey) {
                        throw new Error("ContainerAssetKey is required")
                    }
                    this.containerImage = this.scene.add.image(0, 0, containerAssetKey).setOrigin(0.5, 1)
                    const container = this.wrapperContainer || this.uiContainer
                    this.container = this.scene.rexUI.add.container(0, containerToWrapperOffsetY)
                    if (!this.wrapperContainer) {
                        this.container.setY(containerOffsetY)
                    }
                    this.container.addLocal(this.containerImage)
                    container.addLocal(this.container)
                }
                
            }
        }

        if (tabsConfig) {
            const { width: contentWidth, options } = tabsConfig
            this.tabs = new BaseTabs({
                baseParams: {
                    scene,
                    width: contentWidth,
                    y: -(this.backgroundImage.height - 350),
                },
                options
            })
            this.scene.add.existing(this.tabs)
            this.uiContainer.addLocal(this.tabs)
        }

        this.titleText = new BaseText({
            baseParams: {
                scene,
                text: title,
                x: 0,
                y: -(this.backgroundImage.height - 75),
            },
            options: {
                fontSize: titleFontSize,
                textColor: TextColor.DarkBrown
            }
        })
        scene.add.existing(this.titleText)
        this.uiContainer.addLocal(this.titleText)
        this.xButton = new XButton({
            baseParams: {
                scene,
                config: {
                    x: 0,
                    y: 0,
                },
            },
            options: {
                onPress: () => onXButtonPress(this.xButton),
                disableInteraction: false,
            },
        }).layout().setPosition(this.backgroundImage.width / 2 - 75,-(this.backgroundImage.height - 75))
        this.scene.add.existing(this.xButton)
        //.setPosition(0, -400)
        this.xButton.setInteractive().on("pointerdown", () => {
            onGameObjectPress({
                gameObject: this.xButton,
                onPress: () => onXButtonPress(this.xButton),
                animate: false,
                scene: this.scene,
            })
        })
        this.uiContainer.addLocal(this.xButton)

        if (align === "center") {
            this.setPosition(0, this.backgroundImage.height / 2)
        } else if (align === "top") {
            this.setPosition(0, 0)
        } else if (align === "bottom") {
            this.setPosition(0, this.backgroundImage.height)
        }
    }
}
