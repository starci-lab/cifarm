import {
    EmitterEventName,
    ReceiverEventName,
    useSingletonHook,
    useWs,
    WS,
} from "@/singleton"
import { addSuccessToast } from "@/components"
import { useEffect } from "react"
import {
    ExternalEventEmitter,
    ExternalEventName,
} from "@/modules/event-emitter"

export const useClaimDailyRewardEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.ClaimDailyRewardResponsed, () => {
            addSuccessToast({
                successMessage: "Daily reward claimed",
            })
        })
    }, [])

    useEffect(() => {
        ExternalEventEmitter.on(
            ExternalEventName.RequestClaimDailyReward,
            async () => {
                if (!socket) {
                    return
                }
                socket.on(ReceiverEventName.ClaimDailyRewardResponsed, () => {
                    ExternalEventEmitter.emit(
                        ExternalEventName.ClaimDailyRewardResponsed
                    )
                })
                socket.emit(EmitterEventName.ClaimDailyReward)
            }
        )

        return () => {
            socket?.off(ReceiverEventName.ClaimDailyRewardResponsed)
            ExternalEventEmitter.removeListener(
                ExternalEventName.RequestClaimDailyReward
            )
        }
    }, [socket])
}
