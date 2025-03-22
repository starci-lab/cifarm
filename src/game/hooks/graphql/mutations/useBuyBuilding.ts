import { GRAPHQL_MUTATION_BUY_BUILDING_SWR_MUTATION } from "@/app/constants"
import { BuyBuildingRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"
import { useGraphQLMutationBuyBuildingSwrMutation } from "@/hooks"

export const useBuyBuildingEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationBuyBuildingSwrMutation>
  >(GRAPHQL_MUTATION_BUY_BUILDING_SWR_MUTATION)

    useEffect(() => {
        EventBus.on(
            EventName.RequestBuyBuilding,
            async (message: BuyBuildingRequest) => {
                let completedMessage: ResponsedMessage
                try {
                    await swrMutation.trigger({ request: message })
                    // return the user to the phaser game
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
                EventBus.emit(EventName.BuyBuildingResponsed, completedMessage)
            }
        )

        return () => {
            EventBus.removeListener(EventName.RequestBuyBuilding)
        }
    }, [swrMutation])
}
