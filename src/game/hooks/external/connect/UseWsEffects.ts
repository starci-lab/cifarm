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
import { InventorySchema } from "@/modules/entities"
import _ from "lodash"
import { useAppDispatch, useAppSelector, setInventories } from "@/redux"

export const UseConnectEffects = () => {
    //get the singleton instance of the thief crop mutation
    const { socket, connect } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)
    const dispatch = useAppDispatch()
    const inventories = useAppSelector(state => state.sessionReducer.inventories)

    useEffect(() => {
        if (!socket?.connected) {
            connect()
        }
        //if socket is null do nothing
        if (!socket) return
        // listen for action emitted
        socket.on(ReceiverEventName.ActionEmitted, (data: ActionEmittedMessage) => {
            ExternalEventEmitter.emit(ExternalEventName.ActionEmitted, data)
        })

        // listen for energy synced
        socket.on(ReceiverEventName.UserSynced, ({ data }: UserSyncedMessage) => {
            ExternalEventEmitter.emit(ExternalEventName.UserSynced, data)
        })

        // listen for inventories synced
        socket.on(
            ReceiverEventName.InventoriesSynced,
            ({ data }: InventorySyncedMessage) => {     
                const _inventories = _.cloneDeep(inventories)
                // loop through the inventories and update the inventory
                for (let i = 0; i < data.length; i++) {
                    const inventoryWithStatus = data[i]
                    // if the inventory is created, add it to the cache
                    switch (inventoryWithStatus.status) {
                    case SchemaStatus.Created: {
                    // create the inventory without the status
                        const inventory = {
                            ...inventoryWithStatus,
                            status: undefined
                        } as InventorySchema
                        _inventories.push(inventory)
                        break
                    }
                    case SchemaStatus.Updated:
                    {
                    // merge the inventory with the existing inventory
                        const foundIndex = _inventories.findIndex(inventory => inventory.id === inventoryWithStatus.id)
                        if (foundIndex === -1) {
                            throw new Error("Inventory not found")
                        }
                        _inventories[foundIndex] = mergeObjects(
                            _.cloneDeep(_inventories[foundIndex]),
                            _.cloneDeep(inventoryWithStatus))
                        break
                    }
                    case SchemaStatus.Deleted:
                    {
                        const foundIndex = _inventories.findIndex(inventory => inventory.id === inventoryWithStatus.id)  
                        if (foundIndex === -1) {
                            throw new Error("Inventory not found")
                        }
                        _inventories.splice(foundIndex, 1)
                        break
                    }
                    }
                }
                // mutate the inventories
                dispatch(setInventories(_inventories))
                // emit the inventories synced event
            }
        )

        socket.on(
            ReceiverEventName.PlacedItemsSynced,
            ({ data }: PlacedItemsSyncedMessage) => {
                ExternalEventEmitter.emit(ExternalEventName.PlacedItemsSynced, data)
            }
        )

        ExternalEventEmitter.on(ExternalEventName.RequestReturn, () => {
            socket.emit(EmitterEventName.Return)
        })

        return () => {
            socket.off(ReceiverEventName.PlacedItemsSynced)
            socket.off(ReceiverEventName.ActionEmitted)
            socket.off(ReceiverEventName.UserSynced)
            socket.off(ReceiverEventName.InventoriesSynced)
            socket.off(ReceiverEventName.PlacedItemsSynced)
        }
    }, [socket, inventories])
}
