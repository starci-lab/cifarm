import { InventoryKind } from "@/types"

export interface InventoryId {
    index: number;
    kind: InventoryKind;
    id?: string;
}