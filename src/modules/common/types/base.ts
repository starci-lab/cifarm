export type Atomic = string | number | boolean | null | undefined | object;

export type EmptyObject = {
    [K in string | number]: never;
};