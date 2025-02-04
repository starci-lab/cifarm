"use client"

import {
    API_AUTHENTICATION_SWR_MUTATION,
    QUERY_INVENTORY_SWR,
    QUERY_STATIC_SWR
} from "@/app/constants"
import {
    PLACED_ITEMS_SYNCED_EVENT,
    PlacedItemsSyncedMessage,
    useApiAuthenticationSwrMutation,
    useGameplayIo,
    useQueryStaticSwr,
} from "@/hooks"
import { useQueryInventorySwr } from "@/hooks/swr/graphql"
import { useSingletonHook } from "@/modules/singleton-hook"
import { setAuthenticated, useAppDispatch } from "@/redux"
import { FC, useEffect, useLayoutEffect, useRef } from "react"
import { startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { EventBus, EventName } from "./event-bus"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const dispatch = useAppDispatch()

    //static data useEffect
    const { swr: staticSwr } =
    useSingletonHook<ReturnType<typeof useQueryStaticSwr>>(QUERY_STATIC_SWR)

    //inventoriesSwr useEffect
    const { swr: inventoriesSwr } = useSingletonHook<ReturnType<typeof useQueryInventorySwr>>(QUERY_INVENTORY_SWR)

    useEffect(() => {
        EventBus.on(EventName.LoadStaticData, async () => {
            const data = await staticSwr.mutate(
                (data) => {
                    return data
                },
                { revalidate: false })
            EventBus.emit(EventName.StaticDataLoaded, data)
        })

        EventBus.on(EventName.LoadInventory, async () => {
            const data = await inventoriesSwr.mutate(
                (data) => {
                    return data
                },
                { revalidate: false })
            EventBus.emit(EventName.InventoryLoaded, data)
        })

        return () => {
            //remove listeners
            EventBus.removeListener(EventName.LoadStaticData)
            EventBus.removeListener(EventName.LoadInventory)
        }
    }, [])

    //authentication useEffect
    const { swrMutation: authenticationSwrMutation } = useSingletonHook<
    ReturnType<typeof useApiAuthenticationSwrMutation>
  >(API_AUTHENTICATION_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(EventName.Authenticate, async () => {
            await authenticationSwrMutation.trigger({})
            EventBus.emit(EventName.Authenticated)
            dispatch(setAuthenticated(true))
        })

        return () => {
            EventBus.removeListener(EventName.Authenticate)
        }
    }, [])

    const { socket, connected } = useGameplayIo()

    useEffect(() => {
    //do nothing if not connected
        if (!connected) return
        //if socket is null do nothing
        if (!socket) return
        //listen for placed items synced
        socket.on(PLACED_ITEMS_SYNCED_EVENT, (data: PlacedItemsSyncedMessage) => {
            EventBus.emit(EventName.PlacedItemsSynced, data)
        })
    }, [connected])

    //ensure all swr queries are done
    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = startGame()
        }

        return () => {
            if (game.current) {
                game.current.destroy(true)
                if (game.current !== null) {
                    game.current = null
                }
            }
        }
    }, [])


    return <div id={CONTAINER_ID} className="w-screen h-screen"></div>
}

//export default for dynamic import
export default Game
