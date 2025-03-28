import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, ReceiverEventName, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ExternalEventEmitter, ExternalEventName } from "../../../events"

export const useClaimDailyRewardEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestClaimDailyReward, async () => {
            if (!socket) {
                return
            }
            socket.on(ReceiverEventName.DailyRewardClaimed, () => {
                ExternalEventEmitter.emit(ExternalEventName.ClaimDailyRewardResponsed)
            })
            socket.emit(EmitterEventName.ClaimDailyReward)
        })

        return () => {
            socket?.off(ReceiverEventName.DailyRewardClaimed)
            ExternalEventEmitter.removeListener(ExternalEventName.RequestClaimDailyReward)
        }
    }, [socket])
}
