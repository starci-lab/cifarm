import {
    ExternalEventEmitter,
    ExternalEventName,
    UpdatePlayerContextMessage,
} from "@/modules/event-emitter"
import { useRouterWithSearchParams } from "@/hooks"
import { setPlayerContext, useAppDispatch } from "@/redux"
import { useEffect } from "react"
import {
    WS,
    NOTIFICATION_MODAL_DISCLOSURE,
    GRAPHQL_MUTATION_REFRESH_SWR_MUTATION,
    ReceiverEventName,
    useGraphQLMutationRefreshSwrMutation,
    useSingletonHook,
    useWs,
} from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import { setNotificationModalContent } from "@/redux"
import { saveTokens } from "@/modules/apollo"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import useSWRMutation from "swr/mutation"
import { sleep } from "@/modules/common"

export const usePlayerContextEffects = () => {
    const router = useRouterWithSearchParams()

    const { swrMutation: refreshSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationRefreshSwrMutation>
  >(GRAPHQL_MUTATION_REFRESH_SWR_MUTATION)

    const dispatch = useAppDispatch()

    const authenticationSwrMutation = useSWRMutation(
        "SOCKET_AUTHENTICATION",
        async () => {
            try {
                const refreshToken = await sessionDb.keyValueStore.get(
                    SessionDbKey.RefreshToken
                )
                if (!refreshToken) {
                    return
                }
                const { data } = await refreshSwrMutation.trigger({
                    request: {
                        refreshToken: refreshToken.value,
                    },
                })
                if (!data) {
                    throw new Error("Failed to refresh token")
                }
                await saveTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                })
            } catch (error) {
                console.error(error)
            }
        }
    )

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.UpdatePlayerContext,
            ({ playerContext }: UpdatePlayerContextMessage) => {
                dispatch(setPlayerContext(playerContext))
            }
        )
        return () => {
            ExternalEventEmitter.removeListener(
                ExternalEventName.UpdatePlayerContext
            )
        }
    }, [router])

    const { socket, updateSocket } =
    useSingletonHook<ReturnType<typeof useWs>>(WS)
    const { open, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        NOTIFICATION_MODAL_DISCLOSURE
    )

    useEffect(() => {
        socket?.on(
            ReceiverEventName.YourAccountHasBeenLoggedInFromAnotherDevice,
            () => {
                dispatch(
                    setNotificationModalContent({
                        message:
              "Your account has been logged in from another device. Please connect again to continue.",
                        callback: async () => {
                            // fetch the api to get refresh token
                            await authenticationSwrMutation.trigger()
                            updateSocket()
                            await sleep(1000)
                            socket?.connect()
                            close()
                        },
                        title: "You have been disconnected",
                        buttonText: "Connect again",
                    })
                )
                open()
            }
        )
        return () => {
            socket?.off(
                ReceiverEventName.YourAccountHasBeenLoggedInFromAnotherDevice
            )
        }
    }, [socket, open, dispatch, updateSocket, authenticationSwrMutation])

    useEffect(() => {
        socket?.on("disconnect", () => {
            dispatch(
                setNotificationModalContent({
                    message:
            "You are not connected to the server. Please connect again to continue.",
                    callback: async () => {
                        // fetch the api to get refresh token
                        await authenticationSwrMutation.trigger()
                        updateSocket()
                        await sleep(1000)
                        socket?.connect()
                        close()
                    },
                    title: "You have been disconnected",
                    buttonText: "Connect again",
                })
            )
            open()
        })
        return () => {
            socket?.off("disconnect")
        }
    }, [socket, open, dispatch, updateSocket, authenticationSwrMutation])
}
