import { BaseAssetKey } from "../../../assets"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Pagination } from "../../elements"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { UserSchema } from "@/modules/entities"
import { IPaginatedResponse, QueryNeighborsArgs } from "@/modules/apollo"
import { EventBus, EventName, ModalName } from "@/game/event-bus"
import { FollowRequest, VisitRequest } from "@/modules/axios"
import { ITEM_COUNT } from "./constants"
import { UserCard } from "./UserCard"
import { sleep } from "@/modules/common"
import { FADE_HOLD_TIME, FADE_TIME } from "@/game/constants"

export class NeighborsContent extends ContainerLite {
    private users: Array<UserSchema>
    private usersCount = 0
    private args: QueryNeighborsArgs
    private pagination: Pagination | undefined
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        const { data, count } = this.scene.cache.obj.get(
            CacheKey.Neighbors
        ) as IPaginatedResponse<UserSchema>
        this.users = data
        this.usersCount = count
        this.args = this.scene.cache.obj.get(CacheKey.NeighborsArgs)

        this.createPagination()
        this.updateScrollablePanel()
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
        const userCards = this.createUserCards()
        const scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                width: 750,
                height: 1000,
                scrollMode: "y",
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
        this.addLocal(scrollablePanel)
    }

    private createPagination() {
        const { currentPage, maxPage } = this.getPage()
        this.pagination = new Pagination({
            baseParams: {
                scene: this.scene,
            },
            options: {
                defaultValue: currentPage,
                min: 1,
                max: maxPage,
                onChange: (value) => {
                    console.log(value)
                },
            },
        })
            .layout()
            .setPosition(
                getScreenCenterX(this.scene),
                getScreenBottomY(this.scene) - 300
            )
        this.scene.add.existing(this.pagination)
        this.add(this.pagination)
        return this.pagination
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
            const userCard = new UserCard({
                baseParams: {
                    scene: this.scene,
                },
                options: {
                    avatarAssetKey: "", // tech dept here, need to fetch the image from the avatarUrl
                    badgeAssetKey: BaseAssetKey.UIModalNeighborsIconAdd,
                    text: user.username,
                    hideBadge: user.followed,
                    onBadgePress: () => {
                        EventBus.once(EventName.FollowCompleted, () => {
                            // refresh the neighbors, users
                            EventBus.emit(EventName.RefreshNeighbors)
                            EventBus.emit(EventName.RefreshUser)
                        })

                        const eventMessage: FollowRequest = {
                            followeeUserId: user.id,
                        }
                        EventBus.emit(EventName.RequestFollow, eventMessage)
                    },
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
                        const eventMessage: VisitRequest = {
                            neighborUserId: user.id,
                        }
                        EventBus.emit(EventName.FadeIn)
                        await sleep(FADE_TIME)
                        EventBus.emit(EventName.RequestVisit, eventMessage)
                    },
                },
            })
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
                avatarAssetKey: BaseAssetKey.UIModalNeighborsIconQuestion,
                badgeAssetKey: BaseAssetKey.UIModalNeighborsIconRandom,
                text: "Random",
                onPress: async () => {
                    EventBus.once(EventName.VisitCompleted, async () => {
                        // close the modal
                        EventBus.emit(EventName.CloseModal, {
                            modalName: ModalName.Neighbors
                        }) 
                        
                        // hold for a while
                        await sleep(FADE_HOLD_TIME)
                        // fade all
                        EventBus.emit(EventName.FadeOut)
                    })

                    const eventMessage: VisitRequest = {}
                    EventBus.emit(EventName.FadeIn)
                    await sleep(FADE_TIME)
                    EventBus.emit(EventName.RequestVisit, eventMessage)
                }
            }
        })
        this.scene.add.existing(userCard)
        return userCard
    }
}

export interface GetPageResult {
  currentPage: number;
  maxPage: number;
}
