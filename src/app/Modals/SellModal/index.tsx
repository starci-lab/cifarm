import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ExtendedButton,
    Image,
    DialogBody,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_QUERY_STATIC_SWR, SELL_DISCLOSURE } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/modules/event-emitter"
import { useAppSelector } from "@/redux"
import { SellMessage, useGraphQLQueryStaticSwr } from "@/hooks"
import { getSellInfo } from "@/modules/entities"
import { AssetIconId, assetIconMap } from "@/modules/assets"

export const SellModal: FC = () => {
    const { toggle, isOpen, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(SELL_DISCLOSURE)

    const placedItemId = useAppSelector(
        (state) => state.modalReducer.sellModal.placedItemId
    )
    const placedItems = useAppSelector(
        (state) => state.sessionReducer.placedItems
    )
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)

    const renderSellContent = () => {
        if (!placedItemId) return null

        const placedItem = placedItems.find((item) => item.id === placedItemId)
        if (!placedItem) return null

        if (!staticSwr.data?.data) {
            console.error("Static data not found")
            return null
        }

        const { sellable, sellPrice } = getSellInfo({
            placedItem,
            staticData: staticSwr.data.data,
        })

        if (!sellable) {
            console.error("Item is not sellable")
            return null
        }

        return (
            <div className="flex items-center gap-1">
                <span>Do you want to sell this item for</span>
                <div className="flex items-center gap-1">
                    <Image
                        src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                        className="w-5 h-5"
                    />
                    <span>{sellPrice}</span>
                </div>
                <span>?</span>
            </div>
        )
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                toggle(value)
                if (!value) {
                    ExternalEventEmitter.emit(ExternalEventName.CloseModal, {
                        modalName: ModalName.Sell,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sell</DialogTitle>
                </DialogHeader>
                <DialogBody>{renderSellContent()}</DialogBody>
                <DialogFooter>
                    <ExtendedButton color="ghost" className="w-full" onClick={close}>
                        Cancel
                    </ExtendedButton>
                    <ExtendedButton
                        color="destructive"
                        className="w-full"
                        onClick={() => {
                            close()
                            if (!placedItemId) {
                                console.error("Placed item ID not found")
                                return
                            }
                            const eventMessage: SellMessage = {
                                placedItemId,
                            }
                            ExternalEventEmitter.emit(ExternalEventName.RequestSell, eventMessage)
                        }}
                    >
                        Confirm
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
