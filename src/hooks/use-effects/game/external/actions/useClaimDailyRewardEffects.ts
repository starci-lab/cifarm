import { WS } from "@/app/constants"
import { EmitterEventName, ReceiverEventName, toast, useWs } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "@/modules/event-emitter"

export const useClaimDailyRewardEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useWs>>(WS)

    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.ClaimDailyRewardResponsed, () => {
            toast({
                title: "Daily reward claimed",
            })
        })
    }, [])

    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestClaimDailyReward, async () => {
            if (!socket) {
                return
            }
            socket.on(ReceiverEventName.ClaimDailyRewardResponsed, () => {
                ExternalEventEmitter.emit(ExternalEventName.ClaimDailyRewardResponsed)
            })
            socket.emit(EmitterEventName.ClaimDailyReward)
        })

        return () => {
            socket?.off(ReceiverEventName.ClaimDailyRewardResponsed)
            ExternalEventEmitter.removeListener(ExternalEventName.RequestClaimDailyReward)
        }
    }, [socket])
}
