export interface AbstractSchema<TId extends string> {
    createdAt: Date
    updatedAt: Date
    id: TId
}

export interface StaticAbstractSchema<TId extends string> extends AbstractSchema<TId> {
   displayId: TId
}