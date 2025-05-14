import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLMutationRefreshSwrMutation } from "../swr"
import { GRAPHQL_MUTATION_REFRESH_SWR_MUTATION } from "@/app/constants"
import { useEffect } from "react"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { saveTokens } from "@/modules/apollo"
import { setAuthenticated, useAppDispatch, useAppSelector } from "@/redux"
import { useRouterWithSearchParams } from "../useRouterWithSearchParams"
import { pathConstants } from "@/constants"

export const useAuthentication = () => {
    const { swrMutation: refreshSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationRefreshSwrMutation>
  >(GRAPHQL_MUTATION_REFRESH_SWR_MUTATION)
    
    const router = useRouterWithSearchParams()
    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
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

    // auto navigate to home if authenticated
    useEffect(() => {
        if (!authenticated) {
            return
        }
        router.push(pathConstants.home)
    }, [authenticated])
}
