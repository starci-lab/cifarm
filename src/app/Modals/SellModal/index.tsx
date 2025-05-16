import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ExtendedButton,
    Image,
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
    const { toggle, isOpen, close } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(SELL_DISCLOSURE)
    const { placedItemId } = useAppSelector(
        (state) => state.modalReducer.sellModal
    )
    const placedItems = useAppSelector(
        (state) => state.sessionReducer.placedItems
    )
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)
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
                <div>
                    <div>
                        {(() => {
                            if (!placedItemId) return
                            const placedItem = placedItems.find(
                                (item) => item.id === placedItemId
                            )
                            //return only, if the item is deleted
                            if (!placedItem) return
                            if (!staticSwr.data?.data) throw new Error("Static data not found")
                            const { sellable, sellPrice } = getSellInfo({
                                placedItem,
                                staticData: staticSwr.data.data,
                            })  
                            if (!sellable) {
                                throw new Error("Item is not sellable")
                            }
                            return (
                                <div className="flex items-center gap-1 text-sm">
                                    <div>
                                    Do you want to sell this item for
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Image src={assetIconMap[AssetIconId.Gold].base.assetUrl} className="w-5 h-5" />
                                        {sellPrice}
                                    </div>
                                    <div>
                                        ?
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                </div>
                <DialogFooter>
                    <ExtendedButton color="ghost" className="w-full" onClick={() => close()}>
                    Cancel
                    </ExtendedButton>
                    <ExtendedButton color="destructive" className="w-full" onClick={() => {
                        close()
                        if (!placedItemId) throw new Error("Placed item id not found")
                        const eventMessage: SellMessage = {
                            placedItemId,
                        }
                        ExternalEventEmitter.emit(ExternalEventName.RequestSell, eventMessage)
                    }}>
                    Confirm
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
