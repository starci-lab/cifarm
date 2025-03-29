import {
    ConstructorParams,
    ContainerLiteBaseConstructorParams,
} from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Text, TextColor } from "./Text"
import { BaseAssetKey, baseAssetMap } from "@/game/assets"
import { XButton } from "./XButton"
import { Tabs, TabsOptions } from "./Tabs"
import { Button, ButtonBackground } from "./Button"
import { Buttons } from "phaser3-rex-plugins/templates/ui/ui-components"

const CONTAINER_OFFSET_Y = 150
const BASE_WIDTH = 884
const SMALLER_WIDTH = 546
const TABS_WIDTH = 780
export enum Background {
  Large = "large",
  Medium = "medium",
  XLarge = "xlarge",
  Small = "small",
  XXLarge = "xxlarge",
}

export enum BackgroundAlign {
  Center = "center",
  Top = "top",
  Bottom = "bottom",
}

export interface Size {
  width?: number;
  height?: number;
}

export enum SizeStyle {
  Container = "container",
  TabContainer = "tabContainer",
}   

export interface SizeConfig {
  [SizeStyle.Container]?: Size;
  [SizeStyle.TabContainer]?: Size;
}

export interface BackgroundData {
  backgroundAssetKey: string;
  containerAssetKey?: string;
  wrapperContainerAssetKey?: string;
  tabContainerAssetKey?: string;
  containerToWrapperOffsetY?: number;
  buttonScale?: number;
  buttonOffsetY?: number;
  sizeConfig: SizeConfig;
}

const map: Record<Background, BackgroundData> = {
    [Background.Large]: {
        backgroundAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundLarge].base.textureConfig.key,
        containerAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundLargeContainer].base.textureConfig.key,
        wrapperContainerAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundLargeWrapperContainer].base.textureConfig.key,
        containerToWrapperOffsetY: 14,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
                height: 753,
            },
        },
    },
    [Background.Medium]: {
        backgroundAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundMedium].base.textureConfig.key,
        // containerAssetKey: BaseAssetKey.UIBackgroundMediumContainer,
        containerAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundMediumContainer].base.textureConfig.key,
        buttonScale: 1.4,
        buttonOffsetY: -70,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
            },
        },
    },
    [Background.XLarge]: {
        backgroundAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundXLarge].base.textureConfig.key,
        wrapperContainerAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundXLargeWrapperContainer].base.textureConfig.key,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
            },
            tabContainer: {
                width: BASE_WIDTH,
                height: 920,
            },
        },
    },
    [Background.Small]: {
        backgroundAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundSmall].base.textureConfig.key,
        containerAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundSmallContainer].base.textureConfig.key,
        sizeConfig: {
            container: {
                width: SMALLER_WIDTH,
                height: 389
            },
        },
        buttonOffsetY: -40,
        buttonScale: 0.9,
    },
    [Background.XXLarge]: {
        backgroundAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundXXLarge].base.textureConfig.key,
        tabContainerAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundXXLargeTabContainer].base.textureConfig.key,
        wrapperContainerAssetKey: baseAssetMap[BaseAssetKey.UIBackgroundXXLargeWrapperContainer].base.textureConfig.key,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
            },
            tabContainer: {
                width: BASE_WIDTH,
                height: 1100,
            },
        },
    },
}

export interface ModalBackgroundOptions {
  background: Background;
  title: string;
  hideXButton?: boolean;
  onXButtonPress?: (xButton: XButton) => void;
  titleFontSize?: number;
  container?: {
    showWrapperContainer?: boolean;
    showContainer?: boolean;
  };
  align?: "center" | "top" | "bottom";
  tabs?: {
    options: TabsOptions;
    tabContainerOffsetY?: number;
  };
  mainButton?: {
    text: string;
    onPress: (button: Button) => void;
  };
  secondaryButton?: {
    text: string;
    onPress: (button: Button) => void;
  };
}

export interface GetBackgroundContainerSizeParams {
  background: Background;
  style: SizeStyle;
}
export const getBackgroundContainerSize = ({
    background,
    style = SizeStyle.Container,
}: GetBackgroundContainerSizeParams) => {
    const size = map[background].sizeConfig[style]
    if (!size) {
        throw new Error(`Size for ${style} not found`)
    }
    return size
}

export class ModalBackground extends ContainerLite {
    public xButton: XButton | undefined
    private titleText: Text
    public backgroundImage: Phaser.GameObjects.Image
    public uiContainer: ContainerLite
    public container: ContainerLite | undefined
    public containerImage: Phaser.GameObjects.Image | undefined
    public wrapperContainer: ContainerLite | undefined
    public wrapperContainerImage: Phaser.GameObjects.Image | undefined
    public tabs: Tabs | undefined
    public tabContainerImage: Phaser.GameObjects.Image | undefined
    public wrapperContainerOffsetY: number
    public buttons: Buttons 
    public mainButton: Button | undefined
    public secondaryButton: Button | undefined

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
        const {
            background,
            title,
            onXButtonPress,
            titleFontSize = 56,
            container: containerConfig,
            mainButton,
            secondaryButton,
            tabs: tabsConfig,
            hideXButton = false,
            align = "top",
        } = options
        super(scene, x, y, width, height, children)
        const {
            backgroundAssetKey,
            containerAssetKey,
            buttonScale = 1,
            buttonOffsetY = 10,
            tabContainerAssetKey,
            wrapperContainerAssetKey,
            containerToWrapperOffsetY = -5,
        } = map[background]
        this.wrapperContainerOffsetY = containerToWrapperOffsetY
        this.backgroundImage = this.scene.add
            .image(0, 0, backgroundAssetKey)
            .setOrigin(0.5, 1)
        this.addLocal(this.backgroundImage)

        this.uiContainer = this.scene.rexUI.add.container(
            0,
            -this.backgroundImage.height + CONTAINER_OFFSET_Y
        )
        if (tabsConfig) {
            const { options } = tabsConfig
            this.tabs = new Tabs({
                baseParams: {
                    scene,
                    width: TABS_WIDTH,
                    y: 0,
                },
                options
            })
            this.tabs.setY(this.tabs.getHeight())
            this.scene.add.existing(this.tabs)
            this.uiContainer.addLocal(this.tabs)
        }

        this.addLocal(this.uiContainer)

        if (containerConfig) {
            const { showContainer = true, showWrapperContainer = true } =
        containerConfig
            this.wrapperContainer = this.scene.rexUI.add.container(0, 0)
            if (showWrapperContainer) {
                if (!wrapperContainerAssetKey) {
                    throw new Error("WrapperContainerAssetKey is required")
                }
                this.wrapperContainerImage = this.scene.add
                    .image(0, 0, wrapperContainerAssetKey)
                    .setOrigin(0.5, 0)
                this.wrapperContainer.addLocal(this.wrapperContainerImage)
            }
            this.uiContainer.addLocal(this.wrapperContainer)

            let tabHeight = 0
            if (tabsConfig) {
                if (!this.tabs) {
                    throw new Error("Tabs is not set")
                }
                tabHeight = this.tabs.getHeight()
            }
            this.container = this.scene.rexUI.add.container(
                0,
                containerToWrapperOffsetY + tabHeight
            )

            if (showContainer) {
                if (tabsConfig) {
                    if (!tabContainerAssetKey) {
                        throw new Error("TabContainerAssetKey is required")
                    }
                    this.tabContainerImage = this.scene.add
                        .image(0, 0, tabContainerAssetKey)
                        .setOrigin(0.5, 0)
                    this.container.addLocal(this.tabContainerImage)
                } else {
                    if (!containerAssetKey) {
                        throw new Error("ContainerAssetKey is required")
                    }
                    this.containerImage = this.scene.add
                        .image(0, 0, containerAssetKey)
                        .setOrigin(0.5, 0)
                    this.container.addLocal(this.containerImage)
                }
            }
            this.wrapperContainer.addLocal(this.container)
        }
        if (this.tabs) {
            this.uiContainer.bringChildToTop(this.tabs)
        }

        this.titleText = new Text({
            baseParams: {
                scene,
                text: title,
                x: 0,
                y: -(this.backgroundImage.height - 75),
            },
            options: {
                fontSize: titleFontSize,
                textColor: TextColor.DarkBrown,
            },
        })
        scene.add.existing(this.titleText)
        this.addLocal(this.titleText)
        if (!hideXButton) {
            this.xButton = new XButton({
                baseParams: {
                    scene,
                    config: {
                        x: 0,
                        y: 0,
                    },
                },
                options: {
                    onPress: () => {
                        if (!onXButtonPress) {
                            throw new Error("onXButtonPress is required")
                        }
                        if (!this.xButton) {
                            throw new Error("XButton is not set")
                        }
                        onXButtonPress(this.xButton)
                    },
                    disableInteraction: false,
                },
            })
                .layout()
                .setPosition(
                    this.backgroundImage.width / 2 - 75,
                    -(this.backgroundImage.height - 75)
                )
            this.scene.add.existing(this.xButton)
            this.addLocal(this.xButton)
        }

        this.buttons = this.scene.rexUI.add.buttons({
            y: buttonOffsetY,
            space: {
                item: 20
            }
        })

        if (secondaryButton) {
            const { text, onPress } = secondaryButton
            this.secondaryButton = new Button({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    text,
                    background: ButtonBackground.Secondary,
                    syncTextScale: true,
                    scale: buttonScale,
                    onPress: () => {
                        if (!this.mainButton) {
                            throw new Error("Main button is not set")
                        }
                        onPress(this.mainButton)
                    },
                },
            })
            this.scene.add.existing(this.secondaryButton)
            this.buttons.addButton(this.secondaryButton)
        }

        if (mainButton) {
            const { text, onPress } = mainButton
            this.mainButton = new Button({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    text,
                    syncTextScale: true,
                    scale: buttonScale,
                    onPress: () => {
                        if (!this.mainButton) {
                            throw new Error("Main button is not set")
                        }
                        onPress(this.mainButton)
                    },
                },
            })
            this.scene.add.existing(this.mainButton)
            this.buttons.addButton(this.mainButton)
        }
        this.buttons.layout()
        this.addLocal(this.buttons)

        switch (align) {
        case BackgroundAlign.Center: {
            this.setPosition(0, this.backgroundImage.height / 2)
            break
        }
        case BackgroundAlign.Top: {
            this.setPosition(0, 0)
            break
        }
        case BackgroundAlign.Bottom: {
            this.setPosition(0, this.backgroundImage.height)
            break
        }
        }
    }
}
