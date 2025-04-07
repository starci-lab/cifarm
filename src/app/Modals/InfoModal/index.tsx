"use client"
import {
    GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION,
    INFO_DISCLOSURE,
} from "@/app/constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"
import { ModalHeader } from "@/components"
import {  } from "@/components"
import {
    ExternalEventEmitter,
    ExternalEventName,
    ModalName,
} from "@/game/events"
import { useAppSelector } from "@/redux"
import { useGraphQLQueryPlacedItemsSwrMutation } from "@/hooks"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { placedItemTypeAssetMap } from "@/game"
import { getAssetDataRaw } from "@/game/tilemap"
import { MainVisual } from "./MainVisual"

export const InfoModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(INFO_DISCLOSURE)

    const placedItemId = useAppSelector(
        (state) => state.sessionReducer.placedItemId
    )
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryPlacedItemsSwrMutation>
  >(GRAPHQL_QUERY_PLACED_ITEMS_SWR_MUTATION)
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )
    const placedItem = swrMutation.data?.data.placedItems.find(
        (placedItem) => placedItem.id === placedItemId
    )
    const placedItemType = swr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )

    if (!placedItemType) {
        return null
    }
    if (!placedItem) {
        return null
    }
    if (!swr.data) {
        return null
    }
    const mapAssetData = getAssetDataRaw({
        placedItemType,
        queryStaticResponsePartial: swr.data?.data,
        isAdult: placedItem.animalInfo?.isAdult,
        fruitStage: placedItem.fruitInfo?.currentStage,
    })
    if (!mapAssetData) {
        return null
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                toggle(value)
                if (!value) {
                    ExternalEventEmitter.emit(ExternalEventName.CloseExternalModal, {
                        modalName: ModalName.Info,
                    })
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader
                            title={placedItemTypeAssetMap[placedItemType.displayId].name}
                        />
                    </DialogTitle>
                    <div>
                        <MainVisual mapAssetData={mapAssetData} />
                    </div>
                </DialogHeader>
                <div></div>
            </DialogContent>
        </Dialog>
    )
}
