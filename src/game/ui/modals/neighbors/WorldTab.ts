import { BaseAssetKey } from "../../../assets"
import { CacheKey, SizerBaseConstructorParams } from "../../../types"
import { UserSchema } from "@/modules/entities"
import { IPaginatedResponse, QueryNeighborsArgs } from "@/modules/apollo"
import { ITEM_COUNT, USER_DATA } from "./constants"
import { UserCard } from "./UserCard"
import { Label, ScrollablePanel, Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { Input, InputIcon, NumberInput } from "../../elements"
import { GetPageResult } from "./types"
import { onGameObjectPress } from "../../utils"
import { FADE_HOLD_TIME, FADE_TIME } from "@/game/constants"
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { VisitRequest } from "@/modules/axios"
import { sleep } from "@/modules/common"
import { user } from "@heroui/react"

export class WorldTab extends Sizer {
    private users: Array<UserSchema>
    private usersCount = 0
    private args: QueryNeighborsArgs
    private pagination: NumberInput | undefined
    private scrollablePanel: ScrollablePanel | undefined
    constructor({
        scene,
        config
    }: SizerBaseConstructorParams) {
        super(scene, {
            orientation: "y",
            space: { item: 40 },
            originY: 1,
            y: -180,
            ...config
        })

        const input = new Input({
            baseParams: {
                scene: this.scene,
            },
            options: {
                onChange: (value) => {
                    console.log(value)
                },
                width: 300,
                icon: InputIcon.MagnifyingGlass
            },
        }).layout()
        this.scene.add.existing(input)
        this.add(input)

        const { data, count } = this.scene.cache.obj.get(
            CacheKey.Neighbors
        ) as IPaginatedResponse<UserSchema>
        this.users = data
        this.usersCount = count
        this.args = this.scene.cache.obj.get(CacheKey.NeighborsArgs)

        this.updateScrollablePanel()

        const { currentPage, maxPage } = this.getPage()
        this.pagination = new NumberInput({
            baseParams: {
                scene: this.scene,
            },
            options: {
                defaultValue: currentPage,
                min: 1,
                max: maxPage,
                asPagination: true,
                onChange: (value) => {
                    console.log(value)
                },
            },
        })
        this.scene.add.existing(this.pagination)
        this.add(this.pagination)

        this.layout()
    }

    // get the current page and the max page
    private getPage(): GetPageResult {
        const offset = this.args.offset || 0
        const limit = this.args.limit || ITEM_COUNT
        const currentPage = Math.floor(offset / limit) + 1
        const maxPage = Math.ceil(this.usersCount / limit)
        return { currentPage, maxPage }
    }

    private updateScrollablePanel() {
        if (this.scrollablePanel) {
            this.remove(this.scrollablePanel, true)
        }
        const userCards = this.createUserCards()
        this.scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                width: 750,
                height: 800,
                scrollMode: "y",
                space: {
                    panel: 40,
                },
                panel: {
                    child: userCards,
                    mask: {
                        padding: 1,
                    },
                },
                mouseWheelScroller: {
                    focus: false,
                    speed: 2,
                },
            })
            .layout()
        this.add(this.scrollablePanel)
        this.layout()

        this.scrollablePanel.setChildrenInteractive({
            targets: [
                this.scrollablePanel.getElement("panel") as Sizer
            ]
        })
            .on("child.click", (card: UserCard, pointer: Phaser.Input.Pointer) => {
                const data = card.getData(USER_DATA) as UserSchema
                // if data not found, mean the random user card is clicked
                const button = card.getChildren()[3] as Label
                if (button.getBounds().contains(pointer.x, pointer.y)) {
                    onGameObjectPress({
                        gameObject: button,
                        onPress: async () => {
                            EventBus.once(EventName.VisitCompleted, async () => {
                                // close the modal
                                EventBus.emit(EventName.CloseModal, {
                                    modalName: ModalName.Neighbors
                                })
                                EventBus.emit(EventName.Visit)
                                this.scene.cache.obj.add(CacheKey.VisitedNeighbor, user)
                                // hold for a while
                                await sleep(FADE_HOLD_TIME)
                                // fade out
                                EventBus.emit(EventName.FadeOut)
                            })
                            const neighborUserId = data ? data.id : undefined
                            const eventMessage: VisitRequest = {
                                neighborUserId
                            }
                            EventBus.emit(EventName.FadeIn)
                            await sleep(FADE_TIME)
                            EventBus.emit(EventName.RequestVisit, eventMessage)
                        },
                        scene: this.scene,
                    })
                }
            })
    }

    private createUserCards() {
        const sizer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 20 },
        })

        // create the random user card
        const randomUserCard = this.createRandomUserCard()
        sizer.add(randomUserCard)

        // create cards from the neighbors
        for (const user of this.users) {
            //fetch the source image from the avatarUrl
            // this.scene.load.image(neighbor.id, neighbor.avatarUrl)
            const followed = user.followed
            const userCard = new UserCard({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    avatarAssetKey: "", // tech dept here, need to fetch the image from the avatarUrl
                    badgeAssetKey: followed ? BaseAssetKey.UICommonMinus : BaseAssetKey.UICommonPlus,
                    text: user.username,
                    hideBadge: user.followed,
                    // onBadgePress: () => {
                    //     EventBus.once(EventName.FollowCompleted, () => {
                    //         // refresh the neighbors, users
                    //         EventBus.emit(EventName.RefreshNeighbors)
                    //         EventBus.emit(EventName.RefreshUser)
                    //     })

                    //     const eventMessage: FollowRequest = {
                    //         followeeUserId: user.id,
                    //     }
                    //     EventBus.emit(EventName.RequestFollow, eventMessage)
                    // },
                    // onPress: async () => {
                    //     EventBus.once(EventName.VisitCompleted, async () => {
                    //         // close the modal
                    //         EventBus.emit(EventName.CloseModal, {
                    //             modalName: ModalName.Neighbors
                    //         })
                    //         EventBus.emit(EventName.Visit)
                    //         this.scene.cache.obj.add(CacheKey.VisitedNeighbor, user)
                    //         // hold for a while
                    //         await sleep(FADE_HOLD_TIME)
                    //         // fade out
                    //         EventBus.emit(EventName.FadeOut)
                    //     })
                    //     const eventMessage: VisitRequest = {
                    //         neighborUserId: user.id,
                    //     }
                    //     EventBus.emit(EventName.FadeIn)
                    //     await sleep(FADE_TIME)
                    //     EventBus.emit(EventName.RequestVisit, eventMessage)
                    // },
                },
            })
            userCard.setData(USER_DATA, user)
            this.scene.add.existing(userCard)
            sizer.add(userCard)
        }

        sizer.layout()
        return sizer
    }

    private createRandomUserCard() {
        const userCard = new UserCard({
            baseParams: {
                scene: this.scene,
            },
            options: {
                avatarAssetKey: BaseAssetKey.UIModalNeighborsQuestion,
                badgeAssetKey: BaseAssetKey.UIModalNeighborsIconRandom,
                text: "Random",
                // onPress: async () => {
                //     EventBus.once(EventName.VisitCompleted, async () => {
                //         // close the modal
                //         EventBus.emit(EventName.CloseModal, {
                //             modalName: ModalName.Neighbors
                //         }) 
                        
                //         // hold for a while
                //         await sleep(FADE_HOLD_TIME)
                //         // fade all
                //         EventBus.emit(EventName.FadeOut)
                //     })

                //     const eventMessage: VisitRequest = {}
                //     EventBus.emit(EventName.FadeIn)
                //     await sleep(FADE_TIME)
                //     EventBus.emit(EventName.RequestVisit, eventMessage)
                // }
            }
        })
        this.scene.add.existing(userCard)
        return userCard
    }
}

