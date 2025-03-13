import { API_SELL_SWR_MUTATION } from "@/app/constants"
import { useApiSellSwrMutation } from "@/hooks"
import { SellRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useSellEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiSellSwrMutation>
      >(API_SELL_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestSell, async (message: SellRequest) => {
            const response = await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.SellCompleted, response.data)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestSell)
        }
    }, [swrMutation])
}