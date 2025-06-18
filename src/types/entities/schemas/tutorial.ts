import { AbstractSchema } from "./abstract"
import { TutorialStep } from "@/types"

export interface TutorialSchema extends AbstractSchema {
    [TutorialStep.Start]: boolean
    [TutorialStep.OpenShopModal]: boolean
    [TutorialStep.OpenInventoryModal]: boolean 
    [TutorialStep.Plant]: boolean
    [TutorialStep.OpenNeighborsModal]: boolean
    [TutorialStep.AtNeighbor]: boolean   
}

