export interface IPaginatedResponse<TSchema> {
    count: number
    data: Array<TSchema>
}

export interface QueryManyArgs {
    limit?: number
    offset?: number
}

export interface QueryVariables<TArgs> {
    args: TArgs
}

export interface QueryParams<TQuery, TArgs = undefined> {
    query?: TQuery
    args?: TArgs
}