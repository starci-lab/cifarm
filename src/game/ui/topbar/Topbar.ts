import { UserSchema } from "@/modules/entities"
import { BaseAssetKey, baseAssetMap } from "../../assets"
import { ResourceLabel, Text, TextColor } from "../elements"
import { Label, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { BaseSizerBaseConstructorParams, CacheKey } from "@/game/types"
import BaseSizer from "phaser3-rex-plugins/templates/ui/basesizer/BaseSizer"
import { truncateString } from "@/modules/common"
import { loadImageAwait, loadSvgAwait } from "../utils"
import { createJazziconBlobUrl } from "@/modules/jazz"
import Button from "phaser3-rex-plugins/plugins/button"
import {
    ExternalEventEmitter,
    ExternalEventName,
    ModalName,
    SceneEventEmitter,
    SceneEventName,
} from "../../events"

export class Topbar extends BaseSizer {
    private background: Phaser.GameObjects.Image
    private user: UserSchema
    private profileContainer: Sizer | undefined
    private resourcesContainer: Sizer | undefined
    private energyLabel: Label | undefined
    private tokenLabel: Label | undefined
    private goldLabel: Label | undefined
    private visited: boolean = false
    private watchingUser: UserSchema | undefined
    constructor({ scene, x, y, width, height }: BaseSizerBaseConstructorParams) {
        const background = scene.add
            .image(0, 0, baseAssetMap[BaseAssetKey.UITopbarHeader].base.textureConfig.key)
            .setOrigin(0.5, 0)
        super(scene, x, y, width || background.width, height || background.height)
        this.background = background
        this.addLocal(background)

        this.user = this.scene.cache.obj.get(CacheKey.User)

        SceneEventEmitter.on(SceneEventName.UserRefreshed, () => {
            this.user = this.scene.cache.obj.get(CacheKey.User)
            this.updateContent()
        })

        SceneEventEmitter.on(SceneEventName.UpdateWatchingStatus, async () => {
            this.watchingUser = this.scene.cache.obj.get(CacheKey.WatchingUser) as
        | UserSchema
        | undefined
            this.visited = !!this.watchingUser
            if (this.visited) {
                await this.loadAvatar()
                SceneEventEmitter.emit(SceneEventName.HideButtons)
                SceneEventEmitter.emit(SceneEventName.ShowNeighborButtons)
            } else {
                SceneEventEmitter.emit(SceneEventName.ShowButtons)
                SceneEventEmitter.emit(SceneEventName.HideNeighborButtons)
            }
            this.updateContent()
        })

        this.watchingUser = this.scene.cache.obj.get(CacheKey.WatchingUser) as
      | UserSchema
      | undefined
        this.visited = !!this.watchingUser
        this.updateContent()

        SceneEventEmitter.on(SceneEventName.HideTopbar, () => {
            this.setVisible(false).setActive(false)
        })
        SceneEventEmitter.on(SceneEventName.ShowTopbar, () => {
            this.setVisible(true).setActive(true)
        })
    }

    private updateContent() {
        this.updateProfileContainer()
        this.updateResourcesContainer()
    }

    private async loadAvatar() {
        const user = this.watchingUser ?? this.user
        if (!user) {
            throw new Error("User not found")
        }
        //check if image id is already loaded
        if (this.scene.textures.exists(user.id)) {
            return
        }
        if (user.avatarUrl) {
            await loadImageAwait({
                scene: this.scene,
                key: user.id,
                imageUrl: user.avatarUrl,
            })
        } else {
            await loadSvgAwait({
                scene: this.scene,
                key: user.id,
                scale: 16,
                svgUrl: createJazziconBlobUrl(user.accountAddress),
            })
        }
    }

    private updateProfileContainer() {
        if (this.profileContainer) {
            this.remove(this.profileContainer, true)
        }
        const user = this.watchingUser ?? this.user
        if (!user) {
            throw new Error("User not found")
        }
        const nameBackground = this.scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UITopbarName].base.textureConfig.key
        )
        const nameText = new Text({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: truncateString(user.username, 10, 0),
            },
            options: {
                fontSize: 24,
                textColor: TextColor.White,
            },
        })
        this.scene.add.existing(nameText)
        const name = this.scene.rexUI.add.label({
            text: nameText,
            align: "left",
            space: {
                left: 50,
                top: -2,
            },
            background: nameBackground,
            width: nameBackground.width,
            height: nameBackground.height,
        })
        const avatarWrapperBackground = this.scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UITopbarAvatarWrapper].base.textureConfig.key
        )
        const avatarImage = this.scene.add.image(0, 0, baseAssetMap[BaseAssetKey.UITopbarAvatar].base.textureConfig.key)
        const avatarMask = this.scene.add
            .image(0, 0, baseAssetMap[BaseAssetKey.UITopbarAvatarMask].base.textureConfig.key)
            .setVisible(false)
        const image = this.scene.add
            .image(0, 0, user.id)
            .setDisplaySize(avatarMask.width, avatarMask.height)
        image.setMask(avatarMask.createBitmapMask())
        const imageWithMask = this.scene.rexUI.add
            .label({
                background: avatarMask,
                icon: image,
                width: avatarMask.width,
                height: avatarMask.height,
                align: "center",
            })
            .layout()
        const avatarSizer = this.scene.rexUI.add
            .overlapSizer({
                height: avatarImage.height,
                width: avatarImage.width,
            })
            .addBackground(avatarImage)
            .add(imageWithMask, {
                align: "center-bottom",
                expand: false,
            })
            .layout()
        const levelBoxImage = this.scene.add.image(
            0,
            0,
            baseAssetMap[BaseAssetKey.UITopbarLevelBox].base.textureConfig.key
        )
        const levelText = new Text({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: `${user.level}`,
            },
            options: {
                fontSize: 24,
            },
        })
        this.scene.add.existing(levelText)
        const levelBoxLabel = this.scene.rexUI.add.label({
            background: levelBoxImage,
            text: levelText,
            width: levelBoxImage.width,
            height: levelBoxImage.height,
            align: "center",
        })
        // Left column - Avatar
        const avatar = this.scene.rexUI.add
            .badgeLabel({
                background: avatarWrapperBackground,
                width: avatarWrapperBackground.width,
                height: avatarWrapperBackground.height,
                rightBottom: levelBoxLabel,
                center: avatarSizer,
            })
            .layout()
        this.profileContainer = this.scene.rexUI.add
            .sizer({
                orientation: "x",
                originX: this.visited ? 0.5 : 0,
                originY: 0,
                x: this.visited ? 0 : -this.background.width / 2 + 20,
            })
            .add(avatar)
            .add(name, {
                align: "left-center",
                offsetY:
          this.background.height / 2 - avatarWrapperBackground.height / 2,
                offsetX: -30,
            })
            .layout()
        this.addLocal(this.profileContainer)
        // if not visited, allow to click on the avatar to open the profile modal
        if (!this.visited) {
            const button = new Button(this.profileContainer)
            button.on("click", () => {
                ExternalEventEmitter.emit(ExternalEventName.OpenExternalModal, {
                    modalName: ModalName.Profile,
                })
            })
        }
        return this.profileContainer
    }

    private updateResourcesContainer() {
        if (!this.resourcesContainer) {
            this.energyLabel = this.addLabel({
                iconKey: baseAssetMap[BaseAssetKey.UITopbarIconEnergy].base.textureConfig.key,
                text: "",
                scale: 0.8,
            })
            this.goldLabel = this.addLabel({
                iconKey:  baseAssetMap[BaseAssetKey.UICommonIconGold].base.textureConfig.key,
                text: "",
            })
            this.tokenLabel = this.addLabel({
                iconKey: baseAssetMap[BaseAssetKey.UICommonIconCarrot].base.textureConfig.key,
                text: "",
                scale: 0.9,
            })
            this.resourcesContainer = this.scene.rexUI.add
                .sizer({
                    x: this.background.width / 2 - 20,
                    y: this.background.height / 2,
                    originX: 1,
                    originY: 0.5,
                    orientation: "h",
                })
                .add(this.energyLabel)
                .add(this.goldLabel)
                .add(this.tokenLabel)
                .setItemSpacing(50)
                .layout()
            this.addLocal(this.resourcesContainer)
        }
        if (!this.goldLabel) {
            throw new Error("Gold label not found")
        }
        if (!this.tokenLabel) {
            throw new Error("Token label not found")
        }
        if (!this.visited) {
            this.goldLabel.show()
            this.tokenLabel.show()
        } else {
            this.goldLabel.hide()
            this.tokenLabel.hide()
        }

        //update resources
        if (this.energyLabel) {
            this.energyLabel.text = `${this.user.energy}/${this.getMaxEnergy(
                this.user.level
            )}`
        }
        if (this.goldLabel) {
            this.goldLabel.text = `${this.user.golds ?? 0}`
        }
        if (this.tokenLabel) {
            this.tokenLabel.text = `${this.user.tokens ?? 0}`
        }

        this.resourcesContainer.layout()
        return
    }

    private addLabel({ iconKey, text, scale = 1 }: AddLabelParams) {
        const resourceLabel = new ResourceLabel({
            baseParams: {
                scene: this.scene,
            },
            options: {
                iconKey,
                text,
                scale,
            },
        })
        this.scene.add.existing(resourceLabel)
        return resourceLabel
    }

    private getMaxEnergy(level: number = 1): number {
        return 50 + (level - 1) * 3
    }
}

interface AddLabelParams {
  iconKey: string;
  scale?: number;
  text: string;
}
