import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLMutationRefreshSwrMutation } from "../swr"
import { GRAPHQL_MUTATION_REFRESH_SWR_MUTATION } from "@/app/constants"
import { useEffect } from "react"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { saveTokens } from "@/modules/apollo"
import { setAuthenticated, useAppDispatch } from "@/redux"

export const useAuthentication = () => {
    const { swrMutation: refreshSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationRefreshSwrMutation>
  >(GRAPHQL_MUTATION_REFRESH_SWR_MUTATION)

    const dispatch = useAppDispatch()
    useEffect(() => {
        const handleEffect = async () => {
            const refreshToken = await sessionDb.keyValueStore.get(
                SessionDbKey.RefreshToken
            )
            if (!refreshToken) {
                return
            }

            const { data } = await refreshSwrMutation.trigger({
                request: {
                    refreshToken: refreshToken.value,
                },
            })

            if (!data) {
                throw new Error("Failed to refresh token")
            }

            await saveTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            })

            dispatch(setAuthenticated(true))
        }
        handleEffect()
    }, [])
}
