export interface IPaginatedResponse<TSchema> {
    count: number
    data: Array<TSchema>
}

export interface QueryManyRequest {
    limit?: number
    offset?: number
}

export interface QueryVariables<TRequest> {
    request: TRequest
}

export interface QueryParams<TQuery, TRequest = undefined> {
    query?: TQuery
    request?: TRequest
}

export interface MutationParams<TMutation, TRequest = undefined> {
    mutation?: TMutation
    request?: TRequest
}

export interface MutationVariables<TRequest> {
    request: TRequest
}

