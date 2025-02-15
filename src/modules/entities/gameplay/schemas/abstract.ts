export interface AbstractSchema {
    createdAt: Date
    updatedAt: Date
    id: string
}

export interface StaticAbstractSchema<TId extends string> extends AbstractSchema {
   displayId: TId
}