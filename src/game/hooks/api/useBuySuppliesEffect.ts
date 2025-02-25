import { API_BUY_SUPPLIES_SWR_MUTATION } from "@/app/constants"
import { useApiBuySuppliesSwrMutation } from "@/hooks"
import { BuySuppliesRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"

export const useBuySuppliesEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiBuySuppliesSwrMutation>
      >(API_BUY_SUPPLIES_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuySupplies, async (message: BuySuppliesRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuySuppliesCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuySupplies)
        }
    }, [swrMutation])
}