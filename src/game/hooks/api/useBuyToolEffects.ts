import { API_BUY_TOOL_SWR_MUTATION } from "@/app/constants"
import { useApiBuyToolSwrMutation } from "@/hooks"
import { BuyToolRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useBuyToolEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiBuyToolSwrMutation>
      >(API_BUY_TOOL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyTool, async (message: BuyToolRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuyToolCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyTool)
        }
    }, [swrMutation])
}