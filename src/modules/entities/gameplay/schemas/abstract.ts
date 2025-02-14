export interface AbstractSchema {
    createdAt: Date
    updatedAt: Date
    id: string
}

export interface StaticAbstractSchema extends AbstractSchema {
   displayId: string
}