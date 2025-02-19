import { BaseAssetKey } from "../../../assets"
import { CacheKey, ContainerLiteBaseConstructorParams } from "../../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { Pagination } from "../../elements"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { UserSchema } from "@/modules/entities"
import { IPaginatedResponse, QueryNeighborsArgs } from "@/modules/apollo"
import { EventBus, EventName } from "@/game/event-bus"
import { FollowRequest } from "@/modules/axios"
import { ITEM_COUNT } from "./constants"
import { UserCard } from "./UserCard"

export class FolloweesContent extends ContainerLite {
    private users: Array<UserSchema>
    private userCount = 0
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

        const { data, count } = this.scene.cache.obj.get(CacheKey.Followees) as IPaginatedResponse<UserSchema>
        this.users = data
        this.userCount = count
        this.args = this.scene.cache.obj.get(CacheKey.FolloweesArgs)

        this.createPagination()
        this.updateScrollablePanel()
    }

    // get the current page and the max page
    private getPage() : GetPageResult {
        const offset = this.args.offset || 0
        const limit = this.args.limit || ITEM_COUNT
        const currentPage = Math.floor(offset / limit) + 1
        const maxPage = Math.ceil(this.userCount / limit)
        return { currentPage, maxPage }
    }

    private updateScrollablePanel() {
        const followeesCards = this.createFolloweesCards()
        const scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                width: 750,
                height: 1000,
                scrollMode: "y",
                panel: {
                    child: followeesCards,
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
        }).layout().setPosition(getScreenCenterX(this.scene), getScreenBottomY(this.scene) - 300)
        this.scene.add.existing(this.pagination )
        this.add(this.pagination)
        return this.pagination 
    }

    private createFolloweesCards() {
        const sizer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 20 },
        })
        // first card is the random neighbor card
        const randomNeighborCard = this.createRandomNeighborCard()
        sizer.add(randomNeighborCard)

        // create cards from the neighbors
        for (const user of this.users) {
            //fetch the source image from the avatarUrl
            // this.scene.load.image(neighbor.id, neighbor.avatarUrl)
            const neighborCard = new UserCard({
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
                        console.log(EventName.RequestFollow)
                        EventBus.emit(EventName.RequestFollow, eventMessage)
                    },
                    onPress: () => {
                        console.log("Clicked on John Doe")
                    }
                }
            })
            this.scene.add.existing(neighborCard)
            sizer.add(neighborCard)
        }

        sizer.layout()
        return sizer
    }

    private createRandomNeighborCard() {
        const userCard = new UserCard({
            baseParams: {
                scene: this.scene,
            },
            options: {
                avatarAssetKey: BaseAssetKey.UIModalNeighborsIconQuestion,
                badgeAssetKey: BaseAssetKey.UIModalNeighborsIconRandom,
                text: "Random",
                onPress: () => console.log("Clicked on John Doe"),
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
