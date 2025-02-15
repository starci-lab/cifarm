import { QUERY_DELIVERING_PRODUCTS_SWR } from "@/app/constants"
import { EventBus, EventName } from "@/game/event-bus"
import { useQueryDeliveringProductsSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"

export const useDeliveringProductsEffects = () => {
    //get the singleton instance of the user swr
    const { swr } = useSingletonHook<ReturnType<typeof useQueryDeliveringProductsSwr>>(QUERY_DELIVERING_PRODUCTS_SWR)
    
    // load user data
    useEffect(() => {
        EventBus.on(EventName.LoadDeliveringProducts, async () => {
            //load user data
            const data = await swr.mutate()
            EventBus.emit(EventName.DeliveringProductsLoaded, data?.deliveringProducts)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshDeliveringProducts)
        }
    }, [swr])

    // refresh user data
    useEffect(() => {
        EventBus.on(EventName.RefreshDeliveringProducts, async () => {
            //load user data
            const data = await swr.mutate()
            EventBus.emit(EventName.DeliveringProductsRefreshed, data?.deliveringProducts)
        })

        return () => {
            EventBus.removeListener(EventName.RefreshDeliveringProducts)
        }
    }, [swr])
}