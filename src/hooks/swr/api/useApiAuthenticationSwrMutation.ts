import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../types"
import { signMessage } from "@/modules/blockchain"
import {
    refresh,
    requestMessage,
    saveTokens,
    verifySignature,
    AxiosOptions
} from "@/modules/axios"
import { useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { sessionDb, SessionDbKey } from "@/modules/dexie"

export type UseApiAuthenticationSwrMutationArgs = Partial<{
  //add arguments here
  options: AxiosOptions;
}>;

export const useApiAuthenticationSwrMutation = (): UseSWRMutation<
  void,
  UseApiAuthenticationSwrMutationArgs
> => {
    //get accounts
    const accounts = useAppSelector(
        (state) => state.sessionReducer.accounts.accounts
    )
    const currentId = useAppSelector(
        (state) => state.sessionReducer.accounts.currentId
    )
    const account = accounts.find((account) => account.id === currentId)
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    const network = useAppSelector((state) => state.sessionReducer.network)

    const swrMutation = useSWRMutation(
        v4(),
        async (
            _: string,
            extraArgs: { arg: UseApiAuthenticationSwrMutationArgs }
        ) => {
            const { options } = { ...extraArgs.arg }

            const refreshToken = await sessionDb.keyValueStore.get(
                SessionDbKey.RefreshToken
            )
            //handle case where refresh token found
            if (refreshToken) {
                const { data } = await refresh(
                    {
                        refreshToken: refreshToken.value,
                    },
                    options
                )
                //save the tokens
                await saveTokens(data)
                return
            }

            //check if account is not null
            if (!account) {
                throw new Error("Account not found")
            }
            const { publicKey, privateKey, address } = account
            //first, we call the api to request the message
            const requestMessageResponse = await requestMessage(options)
            //sign the message
            const signature = await signMessage({
                message: requestMessageResponse.data.message,
                publicKey,
                privateKey,
                chainKey,
            })
            //call the api to verify the message
            const verifySignatureResponse = await verifySignature(
                {
                    message: requestMessageResponse.data.message,
                    publicKey,
                    signature,
                    chainKey,
                    accountAddress: address,
                    network,
                },
                options
            )

            //save the tokens
            await saveTokens(verifySignatureResponse.data)
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}
