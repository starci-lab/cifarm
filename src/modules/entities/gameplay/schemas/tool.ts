import { AvailableInType, ToolId } from "../enums"
import { AbstractSchema } from "./abstract"

export interface ToolSchema extends AbstractSchema {
    // override id to acheive the correct type
    id: ToolId;
    availableIn: AvailableInType;
    index: number;
}