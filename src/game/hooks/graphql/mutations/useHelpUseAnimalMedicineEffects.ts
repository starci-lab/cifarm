import { GRAPHQL_MUTATION_HELP_USE_ANIMAL_MEDICINE_SWR_MUTATION } from "@/app/constants"
import { useGraphQLMutationHelpUseAnimalMedicineSwrMutation } from "@/hooks"
import { HelpUseAnimalMedicineRequest } from "@/modules/apollo"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useEffect } from "react"
import { ResponsedMessage, EventBus, EventName } from "../../../event-bus"

export const useHelpUseAnimalMedicineEffects = () => {
    //authentication useEffect
    const { swrMutation } = useSingletonHook<
        ReturnType<typeof useGraphQLMutationHelpUseAnimalMedicineSwrMutation>
      >(GRAPHQL_MUTATION_HELP_USE_ANIMAL_MEDICINE_SWR_MUTATION)
    
    useEffect(() => {
        EventBus.on(EventName.RequestHelpUseAnimalMedicine, async (message: HelpUseAnimalMedicineRequest) => {
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
            EventBus.emit(EventName.HelpUseAnimalMedicineResponsed, completedMessage)
        })
    
        return () => {
            EventBus.removeListener(EventName.RequestHelpUseAnimalMedicine)
        }
    }, [swrMutation])
}