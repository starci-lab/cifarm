import { StringAbstractEntity } from "./abstract"
import { BuildingEntity } from "./building"

export interface UpgradeEntity extends StringAbstractEntity {
    upgradePrice?: number;
    capacity: number;
    upgradeLevel: number;
    buildingId: string;
    building: BuildingEntity;
}