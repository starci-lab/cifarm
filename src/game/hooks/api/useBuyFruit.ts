import { API_BUY_FRUIT_SWR_MUTATION } from "@/app/constants"
import { BuyFruitRequest } from "@/modules/axios"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { useApiBuyFruitSwrMutation } from "@/hooks"

export const useBuyFruitEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useApiBuyFruitSwrMutation>
      >(API_BUY_FRUIT_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyFruit, async (message: BuyFruitRequest) => {
            await swrMutation.trigger({ request: message })
            // return the user to the phaser game
            EventBus.emit(EventName.BuyFruitCompleted)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyFruit)
        }
    }, [swrMutation])
}