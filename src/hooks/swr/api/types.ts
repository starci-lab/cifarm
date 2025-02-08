import { AxiosOptions } from "@/modules/axios"

export interface WithAxiosOptions {
    options?: AxiosOptions
}

export interface WithAxiosOptionsAndRequest<T> extends WithAxiosOptions { 
    request: T
}