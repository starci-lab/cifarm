export interface IPaginatedResponse<TSchema> {
    count: number
    data: Array<TSchema>
}