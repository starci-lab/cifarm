import { GRAPHQL_MUTATION_BUY_TILE_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationBuyTileSwrMutation } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { BuyTileRequest } from "@/modules/apollo"

export const useBuyTileEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationBuyTileSwrMutation>
      >(GRAPHQL_MUTATION_BUY_TILE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestBuyTile, async (message: BuyTileRequest) => {
            let completedMessage: ResponsedMessage
            try {
                await swrMutation.trigger({ request: message })
                completedMessage = {
                    success: true,
                }
            } catch (error) {
                console.error(error)
                completedMessage = {
                    success: false,
                }
            }
            // return the user to the phaser game
            EventBus.emit(EventName.BuyTileResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestBuyTile)
        }
    }, [swrMutation])
}