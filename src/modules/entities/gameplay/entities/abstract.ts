export interface AbstractEntity {
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export interface UuidAbstractEntity extends AbstractEntity {
    id: string
}

export interface StringAbstractEntity extends AbstractEntity {
    id: string
}
