import { ToolId } from "../enums"
import { StaticAbstractSchema } from "./abstract"

export interface ToolSchema extends StaticAbstractSchema<ToolId> {
    sort: number;
    default: boolean;
}