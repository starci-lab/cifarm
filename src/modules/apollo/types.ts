export interface IPaginatedResponse<TEntity> {
    count: number
    data: Array<TEntity>
}