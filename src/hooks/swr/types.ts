import { Dispatch, SetStateAction } from "react"
import { BareFetcher, SWRConfiguration, SWRResponse } from "swr"
import { SWRMutationResponse } from "swr/mutation"

export interface UseSWR<TData, TChangeState = undefined> {
    swr:  SWRResponse<TData, Error, SWRConfiguration<TData, Error, BareFetcher<TData>> | undefined> 
    //function to change the state, if needed
    setParams?: Dispatch<SetStateAction<TChangeState>>
}

export interface UseSWRMutation<TData, ExtraArg = never> {
    swrMutation: SWRMutationResponse<TData, Error, string, ExtraArg>
}