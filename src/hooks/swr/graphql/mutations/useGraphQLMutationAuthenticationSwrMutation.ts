import useSWRMutation from "swr/mutation"
import { UseSWRMutation } from "../../types"
import { signMessage } from "@/modules/blockchain"
import {
    mutationRefresh,
    mutationRequestMessage,
    mutationVerifySignature,
} from "@/modules/apollo/mutations"
import { saveTokens } from "@/modules/axios"
import { setAuthenticated, useAppDispatch, useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { sessionDb, SessionDbKey } from "@/modules/dexie"

export const useGraphQLMutationAuthenticationSwrMutation = (): UseSWRMutation<
  void
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
    const dispatch = useAppDispatch()

    const swrMutation = useSWRMutation(
        v4(),
        async () => {
            const refreshToken = await sessionDb.keyValueStore.get(
                SessionDbKey.RefreshToken
            )
            //handle case where refresh token found
            if (refreshToken) {
                const response = await mutationRefresh({
                    request: {
                        refreshToken: refreshToken.value,
                    }
                })
                //save the tokens
                if (response.data?.refresh) {
                    await saveTokens({
                        accessToken: response.data.refresh.accessToken,
                        refreshToken: response.data.refresh.refreshToken,
                    })
                    dispatch(setAuthenticated(true))
                }
                return
            }

            //check if account is not null
            if (!account) {
                throw new Error("Account not found")
            }
            const { publicKey, privateKey, address } = account
            //first, we call the api to request the message
            const requestMessageResponse = await mutationRequestMessage({})
            
            if (!requestMessageResponse.data?.requestMessage) {
                throw new Error("Failed to get message from server")
            }
            
            //sign the message
            const signature = await signMessage({
                message: requestMessageResponse.data.requestMessage.message,
                publicKey,
                privateKey,
                chainKey,
            })
            //call the api to verify the message
            const verifySignatureResponse = await mutationVerifySignature({
                request: {
                    message: requestMessageResponse.data.requestMessage.message,
                    publicKey,
                    signature,
                    chainKey,
                    accountAddress: address,
                    network,
                    username: account.username,
                }
            })

            //save the tokens
            if (verifySignatureResponse.data?.verifySignature) {
                await saveTokens(verifySignatureResponse.data.verifySignature)
                dispatch(setAuthenticated(true))
            }
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
} 