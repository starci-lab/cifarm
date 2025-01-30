import { noAuthAxios } from "../no-auth-axios"
import { AxiosOptions, Version } from "../types"

export interface RequestMessageResponse {
  message: string;
}

export const requestMessage = ({ version = Version.V1 }: AxiosOptions = {}) => {
    return noAuthAxios.post<RequestMessageResponse>(
        `${version}/gameplay/request-message`
    )
}
