import { QueryManyRequest } from "@/modules/apollo"

export const DEFAULT_LIMIT = 10
export const DEFAULT_OFFSET = 0

export const defaultRequest: QueryManyRequest = {
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET
}