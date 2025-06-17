import { AbstractSchema } from "./abstract"
import { BuildingSchema } from "./building"

export interface UpgradeSchema extends AbstractSchema {
    upgradePrice?: number;
    capacity: number;
    upgradeLevel: number;
    buildingId: string;
    building: BuildingSchema;
    sellPrice?: number;
}