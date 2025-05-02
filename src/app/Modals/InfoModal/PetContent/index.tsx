import React, { FC } from "react"
import { PetType, PlacedItemSchema } from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import {  ExtendedButton } from "@/components"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"
import { useAppSelector } from "@/redux"
interface PetContentProps {
  placedItem: PlacedItemSchema;
}
export const PetContent: FC<PetContentProps> = ({ placedItem }) => {
    const { swr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(
        GRAPHQL_QUERY_STATIC_SWR
    )

    const placedItemType = swr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    const user = useAppSelector((state) => state.sessionReducer.user)
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const pet = swr.data?.data.pets.find((pet) => pet.id === placedItemType.pet)
    if (!pet) {
        throw new Error("Pet not found")
    }
    const checkSelected = () => {
        switch (pet.type) {
        case PetType.Cat:
            return user?.selectedPlacedItemCatId === placedItem.id
        case PetType.Dog:
            return user?.selectedPlacedItemDogId === placedItem.id
        default:
            return false
        }
    }
    return (
        <>
            <div>
                <ExtendedButton className="w-full" disabled={checkSelected()} onClick={() => {
                    switch (pet.type) {
                    case PetType.Cat:
                        ExternalEventEmitter.emit(ExternalEventName.RequestSelectCat, {
                            placedItemPetId: placedItem.id,
                        })
                        break
                    case PetType.Dog:
                        ExternalEventEmitter.emit(ExternalEventName.RequestSelectDog, {
                            placedItemPetId: placedItem.id,
                        })
                        break
                    }
                }}>{
                        checkSelected() ? "Selected" : "Select"
                    }</ExtendedButton>
            </div>
        </>
    )
}
