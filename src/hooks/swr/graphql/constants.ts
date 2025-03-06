import { QueryManyArgs } from "@/modules/apollo"

export const DEFAULT_LIMIT = 10
export const DEFAULT_OFFSET = 0

export const defaultArgs: QueryManyArgs = {
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET
}