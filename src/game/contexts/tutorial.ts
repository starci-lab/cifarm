// context is an object that holds some state that we want to share between components
import { PlacedItemObject } from "../tilemap"

// it is a good place to put state that is shared between multiple components
export const TutorialContext: TutorialContextType = {
    // whether the tutorial is active
    isTutorialActive: false,
    // the first tile of the tutorial
    firstTileStarter: null,
    secondTileStarter: null,
}

export interface TutorialContextType {
    // whether the tutorial is active
    isTutorialActive: boolean;
    // the first tile of the tutorial
    firstTileStarter: PlacedItemObject | null;
    // the second tile of the tutorial
    secondTileStarter: PlacedItemObject | null;
}