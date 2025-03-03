import {
    ConstructorParams,
    ContainerLiteBaseConstructorParams,
} from "@/game/types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { BaseText, TextColor } from "./BaseText"
import { BaseAssetKey } from "@/game/assets"
import { XButton } from "./XButton"
import { BaseTabs, BaseTabsOptions } from "./BaseTabs"
import { Button } from "./Button"

const CONTAINER_OFFSET_Y = 150
const BASE_WIDTH = 884
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
  backgroundAssetKey: BaseAssetKey;
  containerAssetKey?: BaseAssetKey;
  wrapperContainerAssetKey?: BaseAssetKey;
  tabContainerAssetKey?: BaseAssetKey;
  containerToWrapperOffsetY?: number;
  buttonScale?: number;
  buttonOffsetY?: number;
  sizeConfig: SizeConfig;
}

const map: Record<Background, BackgroundData> = {
    [Background.Large]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundLarge,
        containerAssetKey: BaseAssetKey.UIBackgroundLargeContainer,
        wrapperContainerAssetKey: BaseAssetKey.UIBackgroundLargeWrapperContainer,
        containerToWrapperOffsetY: 14,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
                height: 753,
            },
        },
    },
    [Background.Medium]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundMedium,
        // containerAssetKey: BaseAssetKey.UIBackgroundMediumContainer,
        containerAssetKey: BaseAssetKey.UIBackgroundMediumContainer,
        buttonScale: 1.4,
        buttonOffsetY: -60,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
            },
        },
    },
    [Background.XLarge]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundXLarge,
        wrapperContainerAssetKey: BaseAssetKey.UIBackgroundXLargeWrapperContainer,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
            },
            tabContainer: {
                width: BASE_WIDTH,
                height: 920,
            },
        },
    // containerAssetKey: BaseAssetKey.UIBackgroundXLargeContainer,
    },
    [Background.Small]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundSmall,
        containerAssetKey: BaseAssetKey.UIBackgroundSmallContainer,
        sizeConfig: {
            container: {
                width: BASE_WIDTH,
            },
            tabContainer: {
                width: BASE_WIDTH,
            },
        },
    },
    [Background.XXLarge]: {
        backgroundAssetKey: BaseAssetKey.UIBackgroundXXLarge,
        tabContainerAssetKey: BaseAssetKey.UIBackgroundXXLargeTabContainer,
        wrapperContainerAssetKey: BaseAssetKey.UIBackgroundXXLargeWrapperContainer,
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
  onXButtonPress: (xButton: XButton) => void;
  titleFontSize?: number;
  container?: {
    showWrapperContainer?: boolean;
    showContainer?: boolean;
  };
  align?: "center" | "top" | "bottom";
  tabs?: {
    options: BaseTabsOptions;
    tabContainerOffsetY?: number;
  };
  mainButton?: {
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
    public xButton: XButton
    private titleText: BaseText
    public backgroundImage: Phaser.GameObjects.Image
    public uiContainer: ContainerLite
    public container: ContainerLite | undefined
    public containerImage: Phaser.GameObjects.Image | undefined
    public wrapperContainer: ContainerLite | undefined
    public wrapperContainerImage: Phaser.GameObjects.Image | undefined
    public tabs: BaseTabs | undefined
    public tabContainerImage: Phaser.GameObjects.Image | undefined
    public wrapperContainerOffsetY: number
    public mainButton: Button | undefined
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
            titleFontSize = 64,
            container: containerConfig,
            mainButton,
            tabs: tabsConfig,
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
            this.tabs = new BaseTabs({
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

        this.titleText = new BaseText({
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
        })
            .layout()
            .setPosition(
                this.backgroundImage.width / 2 - 75,
                -(this.backgroundImage.height - 75)
            )
        this.scene.add.existing(this.xButton)
        this.addLocal(this.xButton)

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
            this.mainButton.setY(buttonOffsetY)
            this.scene.add.existing(this.mainButton)
            if (!this.container) {
                throw new Error("Container is not set")
            }
            this.addLocal(this.mainButton)
        }

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
