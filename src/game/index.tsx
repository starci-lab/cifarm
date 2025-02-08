"use client"

import {
    API_AUTHENTICATION_SWR_MUTATION,
    QUERY_INVENTORIES_SWR,
    QUERY_STATIC_SWR,
    QUERY_USER_SWR
} from "@/app/constants"
import {
    PLACED_ITEMS_SYNCED_EVENT,
    PlacedItemsSyncedMessage,
    useApiAuthenticationSwrMutation,
    useGameplayIo,
    useQueryStaticSwr,
} from "@/hooks"
import { useQueryInventoriesSwr, useQueryUserSwr } from "@/hooks/swr/graphql"
import { useSingletonHook } from "@/modules/singleton-hook"
import { setAuthenticated, useAppDispatch } from "@/redux"
import React, { FC, useEffect, useLayoutEffect, useRef } from "react"
import { startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { EventBus, EventName } from "./event-bus"
import { useEffects } from "./hooks"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const dispatch = useAppDispatch()

    //static data useEffect
    const { swr: staticSwr } =
    useSingletonHook<ReturnType<typeof useQueryStaticSwr>>(QUERY_STATIC_SWR)

    // userUserData useEffect
    const { swr: userSwr } = useSingletonHook<ReturnType<typeof useQueryUserSwr>>(QUERY_USER_SWR)
    //inventoriesSwr useEffect
    const { swr: inventoriesSwr } = useSingletonHook<ReturnType<typeof useQueryInventoriesSwr>>(QUERY_INVENTORIES_SWR)

    useEffect(() => {
        EventBus.on(EventName.LoadStaticData, async () => {
            const data = await staticSwr.mutate()
            EventBus.emit(EventName.StaticDataLoaded, data)
        })

        EventBus.on(EventName.LoadInventories, async () => {
            const data = await inventoriesSwr.mutate()
            EventBus.emit(EventName.InventoriesLoaded, data?.inventories.data)
        })

        EventBus.on(EventName.LoadUser, async () => {
            //load user data
            const data = await userSwr.mutate()
            EventBus.emit(EventName.UserLoaded, data?.user)
        })

        return () => {
            //remove listeners
            EventBus.removeListener(EventName.LoadStaticData)
            EventBus.removeListener(EventName.LoadInventories)
            EventBus.removeListener(EventName.LoadUser)
        }
    }, [staticSwr, userSwr, inventoriesSwr])

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

    //useEffects
    useEffects()

    return <div id={CONTAINER_ID} className="w-screen h-screen"></div>
}

//export default for dynamic import
export default Game
