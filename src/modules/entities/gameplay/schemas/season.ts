import { SeasonId } from "../enums"
import { BulkSchema } from "./bulk"
import { AbstractSchema } from "./abstract"

export interface SeasonSchema extends AbstractSchema {
    displayId: SeasonId;
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
    bulks: Array<BulkSchema>;
    active: boolean;
}