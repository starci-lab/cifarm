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
    List,
    Title,
    Spacer,
    Alert,
} from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { SELL_MODAL_DISCLOSURE } from "@/singleton"
import {
    ExternalEventEmitter,
    ExternalEventName,
    ModalName,
} from "@/modules/event-emitter"
import { useAppSelector } from "@/redux"
import { SellMessage } from "@/singleton"
import { getSellInfo } from "@/utils"
import { AssetIconId, assetIconMap } from "@/modules/assets"

export const SellModal: FC = () => {
    const { toggle, isOpen, close } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SELL_MODAL_DISCLOSURE)

    const placedItemId = useAppSelector(
        (state) => state.modalReducer.sellModal.placedItemId
    )
    const placedItems = useAppSelector(
        (state) => state.apiReducer.coreApi.placedItems
    )
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)

    const renderSellContent = () => {
        if (!placedItemId) return null

        const placedItem = placedItems.find((item) => item.id === placedItemId)
        if (!placedItem) return null

        if (!staticData) {
            console.error("Static data not found")
            return null
        }

        const { sellable, sellPrice } = getSellInfo({
            placedItem,
            staticData,
        })

        if (!sellable) {
            return null
        }

        return (
            <div>
                <List
                    items={[
                        {
                            title: "Sell Price",
                            tooltipString:
              "The amount of gold you will receive for selling the item",
                            content: sellPrice,
                        },
                    ]}
                    enableScroll={false}
                    contentCallback={(item) => (
                        <div className="flex items-center gap-2 px-3 py-2 bg-content-2 justify-between w-full">
                            <Title
                                title={item.title?.toString() ?? ""}
                                classNames={{
                                    tooltip: "text-base text-muted-foreground",
                                    title: "text-base text-muted-foreground",
                                }}
                                tooltipString={item.tooltipString}
                            />
                            <div className="flex items-center gap-2">
                                <div className="text-base">{item.content?.toString() ?? ""}</div>
                                <Image
                                    src={assetIconMap[AssetIconId.Gold].base.assetUrl}
                                    className="w-6 h-6"
                                />
                            </div>
                        </div>
                    )}
                />
                <Spacer y={4}/>
                <Alert variant="destructive" className="px-3 py-2">
                    Be sure before selling this item. This action cannot be undone.
                </Alert>
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
                            ExternalEventEmitter.emit(
                                ExternalEventName.RequestSell,
                                eventMessage
                            )
                        }}
                    >
            Confirm
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
