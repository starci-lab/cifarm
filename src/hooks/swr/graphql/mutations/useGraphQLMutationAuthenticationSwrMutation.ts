import useSWRMutation from "swr/mutation"       
import { signMessage } from "@/modules/blockchain"
import { setAuthenticated, useAppDispatch, useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { UseSWRMutation } from "../../types"
import { mutationRefresh, mutationRequestMessage, mutationVerifySignature, saveTokens } from "@/modules/apollo"

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
                const mutationRefreshResponse = await mutationRefresh(
                    {
                        request: {
                            refreshToken: refreshToken.value,
                        },
                    },
                )
                if (!mutationRefreshResponse.data) {
                    throw new Error("No data returned from mutationRefresh")
                }
                //save the tokens
                if (!mutationRefreshResponse.data.refresh.data) {
                    throw new Error("No data returned from mutationRefresh")
                }
                await saveTokens(mutationRefreshResponse.data.refresh.data)
                dispatch(setAuthenticated(true))
                return
            }

            //check if account is not null
            if (!account) {
                throw new Error("Account not found")
            }
            const { publicKey, privateKey, address } = account
            //first, we call the api to request the message
            const mutationRequestMessageResponse = await mutationRequestMessage()
            if (!mutationRequestMessageResponse.data) {
                throw new Error("No data returned from mutationRequestMessage")
            }
            //sign the message
            const signature = await signMessage({
                message: mutationRequestMessageResponse.data.requestMessage.message,
                publicKey,
                privateKey,
                chainKey,
            })
            //call the api to verify the message
            const mutationVerifySignatureResponse = await mutationVerifySignature(
                {
                    request: {
                        message: mutationRequestMessageResponse.data.requestMessage.message,
                        publicKey,
                        signature,
                        chainKey,
                        accountAddress: address,
                        network,
                        username: account.username,
                    },
                },
            )
            if (!mutationVerifySignatureResponse.data) {
                throw new Error("No data returned from mutationVerifySignature")
            }

            //save the tokens
            if (!mutationVerifySignatureResponse.data.verifySignature.data) {
                throw new Error("No data returned from mutationVerifySignature")
            }   
            await saveTokens(mutationVerifySignatureResponse.data.verifySignature.data)
            dispatch(setAuthenticated(true))
        }
    )

    //return the state and the data
    return {
        swrMutation,
    }
}