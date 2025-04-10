import { InventoryKind } from "@/modules/entities"

export interface InventoryId {
    index: number;
    kind: InventoryKind;
    id?: string;
}