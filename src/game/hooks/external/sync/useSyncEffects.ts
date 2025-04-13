import { WS } from "@/app/constants"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"
import {
    useWs,
    ActionEmittedMessage,
    InventorySyncedMessage,
    PlacedItemsSyncedMessage,
    UserSyncedMessage,
    ReceiverEventName,
    EmitterEventName,
} from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { mergeObjects, SchemaStatus } from "@/modules/common"
import { InventorySchema, PlacedItemSchema, UserSchema } from "@/modules/entities"
import _ from "lodash"
import {
    useAppDispatch,
    useAppSelector,
    setInventories,
    setPlacedItems,
    setUser,
} from "@/redux"

export const useSyncEffects = () => {
    const { socket, connect } = useSingletonHook<ReturnType<typeof useWs>>(WS)
    const dispatch = useAppDispatch()
    const inventories = useAppSelector(
        (state) => state.sessionReducer.inventories
    )
    const placedItems = useAppSelector(
        (state) => state.sessionReducer.placedItems
    )
    const user = useAppSelector((state) => state.sessionReducer.user)

    // Handle socket connection
    useEffect(() => {
        if (!socket?.connected) {
            connect()
        }
    }, [socket, connect])

    // Handle action emitted events
    useEffect(() => {
        if (!socket) return

        const handleEffect = (data: ActionEmittedMessage) => {
            ExternalEventEmitter.emit(ExternalEventName.ActionEmitted, data)
        }

        socket.on(ReceiverEventName.ActionEmitted, handleEffect)

        return () => {
            socket.off(ReceiverEventName.ActionEmitted)
        }
    }, [socket])

    // Handle user sync events
    useEffect(() => {
        if (!socket) return

        const handleEffect = ({ data }: UserSyncedMessage) => {
            const _user = _.cloneDeep(user)
            if (!_user) {
                throw new Error("User not found")
            }
            const mergedUser = mergeObjects(_user, data)
            dispatch(setUser(mergedUser as UserSchema))
            ExternalEventEmitter.emit(ExternalEventName.UserSynced, mergedUser)
        }

        socket.on(ReceiverEventName.UserSynced, handleEffect)

        return () => {
            socket.off(ReceiverEventName.UserSynced)
        }
    }, [socket, user, dispatch])

    // Handle inventory sync events
    useEffect(() => {
        if (!socket) return

        const handleEffect = ({ data }: InventorySyncedMessage) => {
            const _inventories = _.cloneDeep(inventories)
            for (let i = 0; i < data.length; i++) {
                const inventoryWithStatus = data[i]
                switch (inventoryWithStatus.status) {
                case SchemaStatus.Created: {
                    const inventory = {
                        ...inventoryWithStatus,
                        status: undefined,
                    } as InventorySchema
                    _inventories.push(inventory)
                    break
                }
                case SchemaStatus.Updated: {
                    const foundIndex = _inventories.findIndex(
                        (inventory) => inventory.id === inventoryWithStatus.id
                    )
                    if (foundIndex === -1) {
                        throw new Error("Inventory not found")
                    }
                    _inventories[foundIndex] = mergeObjects(
                        _.cloneDeep(_inventories[foundIndex]),
                        _.cloneDeep(inventoryWithStatus)
                    )
                    break
                }
                case SchemaStatus.Deleted: {
                    const foundIndex = _inventories.findIndex(
                        (inventory) => inventory.id === inventoryWithStatus.id
                    )
                    if (foundIndex === -1) {
                        throw new Error("Inventory not found")
                    }
                    _inventories.splice(foundIndex, 1)
                    break
                }
                }
            }
            dispatch(setInventories(_inventories))
            ExternalEventEmitter.emit(
                ExternalEventName.InventoriesSynced,
                _inventories
            )
        }

        socket.on(ReceiverEventName.InventoriesSynced, handleEffect)

        return () => {
            socket.off(ReceiverEventName.InventoriesSynced)
        }
    }, [socket, inventories, dispatch])

    // Handle placed items sync events
    useEffect(() => {
        if (!socket) return

        const handleEffect = ({ data }: PlacedItemsSyncedMessage) => {
            const _placedItems = _.cloneDeep(placedItems)
            for (let i = 0; i < data.length; i++) {
                const placedItemWithStatus = data[i]
                switch (placedItemWithStatus.status) {
                case SchemaStatus.Created: {
                    const placedItem = {
                        ...placedItemWithStatus,
                        status: undefined,
                    } as PlacedItemSchema
                    _placedItems.push(placedItem)
                    break
                }
                case SchemaStatus.Updated: {
                    const foundIndex = _placedItems.findIndex(
                        (placedItem) => placedItem.id === placedItemWithStatus.id
                    )
                    if (foundIndex === -1) {
                        throw new Error("Placed item not found")
                    }
                    _placedItems[foundIndex] = mergeObjects(
                        _.cloneDeep(_placedItems[foundIndex]),
                        _.cloneDeep(placedItemWithStatus)
                    )
                    break
                }
                case SchemaStatus.Deleted: {
                    const foundIndex = _placedItems.findIndex(
                        (item) => item.id === placedItemWithStatus.id
                    )
                    if (foundIndex === -1) {
                        throw new Error("Placed item not found")
                    }
                    _placedItems.splice(foundIndex, 1)
                    break
                }
                }
            }
            dispatch(setPlacedItems(_placedItems))
            ExternalEventEmitter.emit(
                ExternalEventName.PlacedItemsSynced,
                _placedItems
            )
        }

        socket.on(ReceiverEventName.PlacedItemsSynced, handleEffect)

        return () => {
            socket.off(ReceiverEventName.PlacedItemsSynced)
        }
    }, [socket, placedItems, dispatch])

    // Handle return request events
    useEffect(() => {
        if (!socket) return

        const handleEffect = () => {
            socket.emit(EmitterEventName.Return)
        }

        ExternalEventEmitter.on(ExternalEventName.RequestReturn, handleEffect)

        return () => {
            ExternalEventEmitter.off(ExternalEventName.RequestReturn)
        }
    }, [socket])
}
