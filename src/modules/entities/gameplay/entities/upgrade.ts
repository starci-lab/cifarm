import { BuildingEntity } from "./building"

export interface UpgradeEntity {
    upgradePrice?: number;
    capacity: number;
    upgradeLevel: number;
    buildingId: string;
    building: BuildingEntity;
}