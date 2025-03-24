import { GAMEPLAY_IO } from "@/app/constants"
import { EmitterEventName, ReceiverEventName, useGameplayIo } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../../event-bus"

export const useClaimDailyRewardEffects = () => {
    const { socket } = useSingletonHook<ReturnType<typeof useGameplayIo>>(GAMEPLAY_IO)
    useEffect(() => {
        EventBus.on(EventName.RequestClaimDailyReward, async () => {
            if (!socket) {
                return
            }
            socket.on(ReceiverEventName.DailyRewardClaimed, () => {
                EventBus.emit(EventName.ClaimDailyRewardResponsed)
            })
            socket.emit(EmitterEventName.ClaimDailyReward)
        })

        return () => {
            EventBus.removeListener(EventName.RequestClaimDailyReward)
        }
    }, [socket])
}
