import { GRAPHQL_MUTATION_UPGRADE_BUILDING_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationUpgradeBuildingSwrMutation } from "@/hooks"
import { UpgradeBuildingRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useUpgradeBuildingEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationUpgradeBuildingSwrMutation>
      >(GRAPHQL_MUTATION_UPGRADE_BUILDING_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestUpgradeBuilding, async (message: UpgradeBuildingRequest) => {
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
            EventBus.emit(EventName.UpgradeBuildingResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestUpgradeBuilding)
        }
    }, [swrMutation])
}