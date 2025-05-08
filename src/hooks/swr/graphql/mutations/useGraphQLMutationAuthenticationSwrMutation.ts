import useSWRMutation from "swr/mutation"
import { signMessage } from "@/modules/blockchain"
import { setAuthenticated, useAppDispatch, useAppSelector } from "@/redux"
import { v4 } from "uuid"
import { UseSWRMutation } from "../../types"
import {
    mutationRefresh,
    mutationRequestMessage,
    mutationVerifySignature,
    saveTokens,
} from "@/modules/apollo"
import { sessionDb } from "@/modules/dexie"

export const useGraphQLMutationAuthenticationSwrMutation =
  (): UseSWRMutation<void> => {
      //get accounts
      const accounts = useAppSelector(
          (state) => state.sessionReducer.accounts.accounts
      )
      const activeAccountId = useAppSelector(
          (state) => state.sessionReducer.activeAccountId
      )
      const account = accounts.find((account) => account.id === activeAccountId)
      const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
      const network = useAppSelector((state) => state.sessionReducer.network)
      const dispatch = useAppDispatch()

      const swrMutation = useSWRMutation("AUTHENTICATION", async () => {
          if (!account) {
              throw new Error("Account not found")
          }
          if (!activeAccountId) {
              throw new Error("Active account not found")
          }
          const storedAccount = await sessionDb.accounts.get(activeAccountId)
          if (!storedAccount) {
              throw new Error("Account not found")
          }
          //handle case where refresh token found
          if (storedAccount.refreshToken) {
              const mutationRefreshResponse = await mutationRefresh({
                  request: {
                      refreshToken: storedAccount.refreshToken,
                  },
              })
              if (!mutationRefreshResponse.data) {
                  throw new Error("No data returned from mutationRefresh")
              }
              //save the tokens
              if (!mutationRefreshResponse.data.refresh.data) {
                  throw new Error("No data returned from mutationRefresh")
              }
              await saveTokens({
                  accessToken: mutationRefreshResponse.data.refresh.data.accessToken,
                  refreshToken: mutationRefreshResponse.data.refresh.data.refreshToken,
                  accountId: storedAccount.id,
              })
              dispatch(setAuthenticated(true))
              return
          }
          const { publicKey, privateKey, address } = account
          //first, we call the api to request the message
          const mutationRequestMessageResponse = await mutationRequestMessage()
          if (!mutationRequestMessageResponse.data) {
              throw new Error("No data returned from mutationRequestMessage")
          }
          //sign the message
          if (!mutationRequestMessageResponse.data.requestMessage.data) {
              throw new Error("No data returned from mutationRequestMessage")
          }
          const message =
        mutationRequestMessageResponse.data.requestMessage.data.message
          const signature = await signMessage({
              message,
              publicKey,
              privateKey,
              chainKey,
          })
          //call the api to verify the message
          const mutationVerifySignatureResponse = await mutationVerifySignature({
              request: {
                  message,
                  publicKey,
                  signature,
                  chainKey,
                  accountAddress: address,
                  network,
                  username: account.username,
              },
          })
          if (!mutationVerifySignatureResponse.data) {
              throw new Error("No data returned from mutationVerifySignature")
          }

          //save the tokens
          if (!mutationVerifySignatureResponse.data.verifySignature.data) {
              throw new Error("No data returned from mutationVerifySignature")
          }
          await saveTokens({
              accessToken:
          mutationVerifySignatureResponse.data.verifySignature.data.accessToken,
              refreshToken:
          mutationVerifySignatureResponse.data.verifySignature.data
              .refreshToken,
              accountId: storedAccount.id,
          })
          dispatch(setAuthenticated(true))
      })

      //return the state and the data
      return {
          swrMutation,
      }
  }
