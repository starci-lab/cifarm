import { API_DELIVER_MORE_PRODUCT_SWR_MUTATION } from "@/app/constants"
import { useApiDeliverProductSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { EventBus, EventName } from "../../event-bus"
import { DeliverMoreProductRequest } from "@/modules/axios"

export const useDeliverMoreProductEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useApiDeliverProductSwrMutation>
  >(API_DELIVER_MORE_PRODUCT_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(
            EventName.RequestDeliverMoreProduct,
            async (message: DeliverMoreProductRequest) => {
                await swrMutation.trigger({ request: message })
                // return the user to the phaser game
                EventBus.emit(EventName.DeliverMoreProductCompleted)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestDeliverMoreProduct)
        }
    }, [swrMutation])
}
