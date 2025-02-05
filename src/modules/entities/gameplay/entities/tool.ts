import { AvailableInType, ToolId } from "../enums"
import { StringAbstractEntity } from "./abstract"

export interface ToolEntity extends StringAbstractEntity {
    // override id to acheive the correct type
    id: ToolId;
    availableIn: AvailableInType;
    index: number;
}