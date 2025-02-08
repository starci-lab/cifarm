import { authAxios } from "../auth-axios"
import { AxiosOptions } from "../types"
import { Version } from "../types"


export const updateTutorial = (
    { version = Version.V1 }: AxiosOptions = {}
) =>
    authAxios.post(`${version}/gameplay/update-tutorial`)