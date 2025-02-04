import { BaseAssetKey } from "@/game/assets"
import { SizerBaseConstructorParams } from "../../../types"
import { UISizer } from "../../UISizer"
import { BaseText } from "../../elements"
import { ProgressBar } from "../../../containers"
import { onGameObjectClick } from "../../utils"
import { ModalName } from "../ModalManager"
import { EventName } from "../../../event-bus"

export class QuestContent extends UISizer {
    private closeButton: Phaser.GameObjects.Sprite | undefined
    constructor(baseParams: SizerBaseConstructorParams) {
        super(baseParams)

        // create the quest background
        this.createInviteUserItemCard()
        // create the close button
        this.closeButton = this.createCloseButton()
    }

    private createCloseButton() {
        // create the close button
        const closeButton = this.scene.add.sprite(0, 0, BaseAssetKey.ModalQuestIconClose)
        // add the on click event
        closeButton.setInteractive().on("pointerdown", () => {
            onGameObjectClick({
                gameObject: closeButton,
                onClick: () => {
                    this.scene.events.emit(EventName.CloseModal, ModalName.Quest)
                },
                scene: this.scene,
            })
        }).setPosition(this.x + 425, this.y - 345)
        this.add(closeButton)
        return closeButton
    }

    // create the item card
    private createInviteUserItemCard() {
        const content = this.scene.add.container(this.x, this.y)
        //create the progress bar
        const progressBar = new ProgressBar({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: - 20,
            },
            options: {
                progress: 0.5,
            }
        }).setScale(1.2, 1.2)
        this.scene.add.existing(progressBar)
        content.add(progressBar)

        // create text
        const text = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 20,
                text: "10/20 users invited",
            },
            options: {
                fontSize: 20,
                enableStroke: true,
            },
        })
        this.scene.add.existing(text)
        content.add(text)

        // create the item card
        const itemCard = this.createItemCard({
            title: "Invite User",
            onClick: () => {
                console.log("Invite User")
            },
            content: content,
            contentPosition: {
                x: - 250,
                y: 20,
            }
        })
    }

    // create the item card
    private createItemCard({ title, onClick, content, contentPosition }: CreateItemCardParams) {
    // create card container
        const backgroundContainer = this.scene.add.container(0, 0)
        // create card item image
        const backgroundImage = this.scene.add.image(
            0,
            0,
            BaseAssetKey.ModalQuestCardItem
        )
        // update the position of the card item image
        backgroundImage
            .setPosition(-backgroundImage.width * 0.5, -backgroundImage.height * 0.5)
            .setOrigin(0, 0)
        backgroundContainer.add(backgroundImage)
        // create the pin
        const pin = this.scene.add
            .image(0, 0, BaseAssetKey.ModalQuestPin)
            .setPosition(backgroundImage.x - 15, backgroundImage.y - 15)
            .setOrigin(0, 0)
        backgroundContainer.add(pin)
        // create title
        const cardTitleImage = this.scene.add.image(0, 0, BaseAssetKey.ModalQuestCardTitle)
        const titleText = new BaseText({
            baseParams: {
                scene: this.scene,
                x: 0,
                y: 0,
                text: title,
            },
            options: {
                fontSize: 32,
                enableStroke: true,
            },
        })
        this.scene.add.existing(titleText)
        const titleLabel = this.scene.rexUI.add.label({
            x: - backgroundImage.width / 2 + 40,
            y: - backgroundImage.height / 2 - 30,
            originX: 0,
            originY: 0,
            background: cardTitleImage,
            width: cardTitleImage.width,
            height: cardTitleImage.height,
            text: titleText,
            align: "center",
        }).layout()
        backgroundContainer.add(titleLabel)
        // create the card item  wrapper
        const wrapperBackgroundContainer = this.scene.add.container(
            0,
            0,
            backgroundContainer.setPosition(
                - backgroundContainer.width / 2,
                - backgroundContainer.height / 2
            )
        )
        
        // create the card item label
        const cardItemLabel = this.scene.rexUI.add.label({
            x: this.x,
            y: this.y,
            width: backgroundImage.width,
            height: backgroundImage.height,
            background: wrapperBackgroundContainer,
            align: "center",
        }).layout()
        // add the content
        if (content) {
            const x = this.x + (contentPosition?.x ?? 0)
            const y = this.y + (contentPosition?.y ?? 0)
            content.setDepth(1).setPosition(x, y)
            cardItemLabel.add(content)
        }
        // add the container to the scene
        this.add(cardItemLabel)
        return cardItemLabel
    }
}

interface CreateItemCardParams {
  // onclick callback
  onClick: () => void;
  // quest title
  title: string;
  // content
  content?: Phaser.GameObjects.Container
  // content position
  contentPosition?: Phaser.Types.Math.Vector2Like
}
