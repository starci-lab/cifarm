"use client"

import React, { FC, useEffect, useLayoutEffect, useRef } from "react"
import { startGame } from "./config"
import { CONTAINER_ID } from "./constants"
import { useSingletonHook } from "@/modules/singleton-hook"
import {
    API_AUTHENTICATION_SWR_MUTATION,
    QUERY_STATIC_SWR,
} from "@/app/constants"
import {
    PLACED_ITEMS_SYNCED_EVENT,
    PlacedItemsSyncedMessage,
    useApiAuthenticationSwrMutation,
    useGameplayIo,
    useQueryStaticSwr,
} from "@/hooks"
import { EventBus, EventName } from "./event-bus"
import { setAuthenticated, useAppDispatch } from "@/redux"

export const Game: FC = () => {
    const game = useRef<Phaser.Game | null>(null)
    const dispatch = useAppDispatch()

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

    //static data useEffect
    const { swr: staticSwr } =
    useSingletonHook<ReturnType<typeof useQueryStaticSwr>>(QUERY_STATIC_SWR)

    useEffect(() => {
        if (!staticSwr.isLoading) return
        EventBus.on(EventName.LoadStaticData, async () => {
            EventBus.emit(EventName.StaticDataLoaded, staticSwr.data)
        })

        return () => {
            EventBus.removeListener(EventName.LoadStaticData)
        }
    }, [staticSwr.isLoading])

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

    return <div id={CONTAINER_ID} className="w-screen h-screen"></div>
}

//export default for dynamic import
export default Game
