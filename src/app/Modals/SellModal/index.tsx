import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    ScaledImage,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_QUERY_STATIC_SWR, SELL_DISCLOSURE } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName, ModalName } from "@/game"
import { useAppSelector } from "@/redux"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { getAssetDataFromPlacedItem } from "@/modules/assets"

export const SellModal: FC = () => {
    const { toggle, isOpen } =
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
                            if (!placedItem) throw new Error("Placed item not found")
                            if (!staticSwr.data?.data) throw new Error("Static data not found")
                            const { assetUrl } = getAssetDataFromPlacedItem({
                                placedItem: placedItem!,
                                staticData: staticSwr.data.data,
                                phaserMap: false,
                            })
                            return <ScaledImage src={assetUrl} />
                        })()}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
