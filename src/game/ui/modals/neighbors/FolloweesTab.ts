import { CacheKey, ContainerLiteBaseConstructorParams } from "../../../types"
import ContainerLite from "phaser3-rex-plugins/plugins/containerlite"
import { getScreenBottomY, getScreenCenterX } from "../../utils"
import { UserSchema } from "@/modules/entities"
import { IPaginatedResponse, QueryNeighborsArgs } from "@/modules/apollo"
import { ITEM_COUNT } from "./constants"
import { Background, getBackgroundContainerSize, NumberInput, Size, SizeStyle } from "../../elements"

export class FolloweesContent extends ContainerLite {
    private users: Array<UserSchema>
    private userCount = 0
    private args: QueryNeighborsArgs
    private pagination: NumberInput | undefined
    private size: Size
    constructor({
        scene,
        x,
        y,
        width,
        height,
        children,
    }: ContainerLiteBaseConstructorParams) {
        super(scene, x, y, width, height, children)

        this.size = getBackgroundContainerSize({
            style: SizeStyle.TabContainer,
            background: Background.XXLarge,
        })
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
        const scrollablePanel = this.scene.rexUI.add
            .scrollablePanel({
                width: this.size?.width,
                height: this.size?.height,
                scrollMode: "y",
                panel: {
                    child: this.createUserCards(),
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
        this.pagination = new NumberInput({
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
                asPagination: true
            },
        }).layout().setPosition(getScreenCenterX(this.scene), getScreenBottomY(this.scene) - 300)
        this.scene.add.existing(this.pagination )
        this.add(this.pagination)
        return this.pagination 
    }

    private createUserCards() {
        const sizer = this.scene.rexUI.add.sizer({
            orientation: "y",
            space: { item: 20 },
        })

        // create cards from the neighbors
        //for (const user of this.users) {
        //fetch the source image from the avatarUrl
        // this.scene.load.image(neighbor.id, neighbor.avatarUrl)
        // const neighborCard = new UserCard({
        //     baseParams: {
        //         scene: this.scene,
        //     },
        //     options: {
        //         avatarAssetKey: "", // tech dept here, need to fetch the image from the avatarUrl
        //         badgeAssetKey: BaseAssetKey.UIModalNeighborsIconAdd,
        //         text: user.username,
        //         hideBadge: user.followed,
        //         onBadgePress: () => {
        //             EventBus.once(EventName.FollowCompleted, () => {
        //             // refresh the neighbors, users
        //                 EventBus.emit(EventName.RefreshNeighbors)
        //                 EventBus.emit(EventName.RefreshUser)
        //             })

        //             const eventMessage: FollowRequest = {
        //                 followeeUserId: user.id,
        //             }
        //             console.log(EventName.RequestFollow)
        //             EventBus.emit(EventName.RequestFollow, eventMessage)
        //         },
        //         onPress: () => {
        //             console.log("Clicked on John Doe")
        //         }
        //     }
        // })
        // this.scene.add.existing(neighborCard)
        // sizer.add(neighborCard)
        //}

        sizer.layout()
        return sizer
    }

    
}

export interface GetPageResult {
    currentPage: number;
    maxPage: number;
}
