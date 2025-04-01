export interface GraphQLResponse<TData = undefined> {
    success: boolean;
    message: string;
    data?: TData;
}