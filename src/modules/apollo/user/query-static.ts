import { gql } from "@apollo/client"
import { client } from "../client"
import { Activities, AnimalRandomness, CropRandomness, EnergyRegen, PlacedItemTypeEntity, SpinInfo, Starter } from "@/modules/entities"

//long query for querying all the static data
export const query = gql`
    {
    activities {
        water {
            experiencesGain
            energyConsume
        }
        feedAnimal {
            experiencesGain
            energyConsume
        }
        usePesticide {
            experiencesGain
            energyConsume
        }
        collectAnimalProduct {
            experiencesGain
            energyConsume
        }
        useFertilizer {
            experiencesGain
            energyConsume
        }
        useHerbicide {
            experiencesGain
            energyConsume
        }
        helpUseHerbicide {
            experiencesGain
            energyConsume
        }
        helpUsePesticide {
            experiencesGain
            energyConsume
        }
        helpWater {
            experiencesGain
            energyConsume
        }
        thiefCrop {
            experiencesGain
            energyConsume
        }
        thiefAnimalProduct {
            experiencesGain
            energyConsume
        }
        cureAnimal {
            experiencesGain
            energyConsume
        }
        helpCureAnimal {
            experiencesGain
            energyConsume
        }
        harvestCrop {
            experiencesGain
            energyConsume
        }
    }
    cropRandomness {
        thief3
        thief2
        needWater
        isWeedyOrInfested
    }
    animalRandomness {
        sickChance
        thief3
        thief2
    }
    starter {
        golds
    }
    spinInfo {
        appearanceChanceSlots {
            common {
                count
                thresholdMin
                thresholdMax
            }
            rare {
                count
                thresholdMin
                thresholdMax
            }
            uncommon {
                count
                thresholdMin
                thresholdMax
            }
            veryRare {
                count
                thresholdMin
                thresholdMax
            }
        }
    }
    energyRegen {
        time
    }
    placedItemTypes {
        createdAt
        updatedAt
        deletedAt
        id
        type
        tileId
        buildingId
        animalId
    }
}`

export interface QueryStaticResponse {
    activities: Activities
    cropRandomness: CropRandomness
    animalRandomness: AnimalRandomness
    stater: Starter
    spinInfo: SpinInfo
    energyRegen: EnergyRegen
    placedItemTypes: Array<PlacedItemTypeEntity>
}
export const queryStatic = async () => {
    return client.query<QueryStaticResponse>({
        query
    })
}
