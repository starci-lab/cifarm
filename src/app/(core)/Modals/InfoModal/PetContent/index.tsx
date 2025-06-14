import React, { FC } from "react"
import { PetType, PlacedItemSchema } from "@/modules/entities"
import { useSingletonHook } from "@/modules/singleton-hook"
import { GRAPHQL_QUERY_STATIC_SWR } from "@/app/(core)/constants"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { ExtendedButton, Spacer, Title, DialogFooter, DialogBody, Separator } from "@/components"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"
import { useAppSelector } from "@/redux"
interface PetContentProps {
  placedItem: PlacedItemSchema;
}
export const PetContent: FC<PetContentProps> = ({ placedItem }) => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(GRAPHQL_QUERY_STATIC_SWR)

    const placedItemType = staticSwr.data?.data.placedItemTypes.find(
        (placedItemType) => placedItemType.id === placedItem?.placedItemType
    )
    const user = useAppSelector((state) => state.sessionReducer.user)
    if (!placedItemType) {
        throw new Error("Placed item type not found")
    }
    const pet = staticSwr.data?.data.pets.find(
        (pet) => pet.id === placedItemType.pet
    )
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

    const tooltipString = () => {
        switch (pet.type) {
        case PetType.Cat:
            return "Cats help you steal more items with a chance."
        case PetType.Dog:
            return "Dogs help you protect your items from thieves with a chance."
        }
    }

    return (
        <>
            <DialogBody>
                <div className="bg-content-2 rounded-lg overflow-hidden">
                    <div className="p-3">
                        <Title classNames={{
                            title: "text-muted-foreground leading-none text-base",
                            tooltip: "text-muted-foreground"
                        }} title="Assistance chance" tooltipString={tooltipString()} />
                        <Spacer y={2} />
                        <div className="text-4xl text-primary leading-none">
                            {`${(
                                (staticSwr.data?.data.petInfo[pet.type].chance ?? 0) * 100
                            ).toFixed(2)}%`}
                        </div>
                    </div>
                    <Separator />
                    {pet.type === PetType.Cat && (
                        <div>
                            <div className="flex justify-between items-center p-3">
                                <Title
                                    title="Plus Quantity"
                                    classNames={{
                                        title: "text-muted-foreground leading-none text-base",
                                        tooltip: "text-muted-foreground w-4 h-4"
                                    }}
                                />
                                <div className="leading-none">
                                    {staticSwr.data?.data.petInfo[pet.type].plusQuantity}
                                </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center p-3">
                                <Title
                                    title="Percent Quantity Bonus"
                                    classNames={{
                                        title: "text-muted-foreground leading-none text-base",
                                        tooltip: "text-muted-foreground w-4 h-4"
                                    }}
                                    tooltipString="The percentage of the quantity of the item that the pet will steal."
                                />
                                <div className="leading-none">
                                    {(
                                        (staticSwr.data?.data.petInfo[pet.type]
                                            .percentQuantityBonus ?? 0) * 100
                                    ).toFixed(2)}
                %
                                </div>
                            </div>
                        </div>
                    )}
                    <Separator />
                    {pet.type === PetType.Dog && (
                        <div className="p-3">
                            <div className="flex justify-between items-center">
                                <Title
                                    title="Energy Reduce"
                                    classNames={{
                                        title: "text-muted-foreground leading-none text-base",
                                        tooltip: "text-muted-foreground w-4 h-4"
                                    }}
                                />
                                <div className="leading-none">
                                    {staticSwr.data?.data.petInfo[pet.type].energyReduce}
                                </div>
                            </div>  
                        </div>
                    )}
                </div>
            </DialogBody>
            <DialogFooter >
                <ExtendedButton
                    className="w-full"
                    disabled={checkSelected()}
                    onClick={() => {
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
                    }}
                >
                    {checkSelected() ? "Selected" : "Select"}
                </ExtendedButton>
            </DialogFooter>
        </>
    )
}
