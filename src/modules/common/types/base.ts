import { DeepPartial } from "react-hook-form"

export type Atomic = string | number | boolean | null | undefined | object;

export type EmptyObject = {
    [K in string | number]: never;
};

export enum SchemaStatus {
    Created = "created",    
    Updated = "updated",
    Deleted = "deleted"
}
export type WithStatus<TSchema> = DeepPartial<TSchema> & {
    status: SchemaStatus
}