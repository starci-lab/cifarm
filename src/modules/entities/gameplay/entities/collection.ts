export interface CollectionEntity {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    collection: string
    data: object
}

export interface SpeedUpDataInterface {
    time: number
}