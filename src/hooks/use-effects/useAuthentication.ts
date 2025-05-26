import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLMutationRefreshSwrMutation } from "../swr"
import { GRAPHQL_MUTATION_REFRESH_SWR_MUTATION } from "@/app/constants"
import { useEffect } from "react"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { saveTokens } from "@/modules/apollo"
import { setAuthenticated, setLoaded, useAppDispatch, 
    useAppSelector
} from "@/redux"
import { neutralPages, pathConstants, unauthenticatedPages } from "@/constants"
import { useRouterWithSearchParams } from "../useRouterWithSearchParams"
import { usePathname } from "next/navigation"
//import { pathConstants } from "@/constants"


export const useAuthentication = () => {
    const { swrMutation: refreshSwrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationRefreshSwrMutation>
  >(GRAPHQL_MUTATION_REFRESH_SWR_MUTATION)
    //const router = useRouterWithSearchParams()
    //const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const dispatch = useAppDispatch()
    const loaded = useAppSelector(state => state.sessionReducer.loaded)
    useEffect(() => {
        const handleEffect = async () => {
            try {
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
            } catch (error) {
                console.error(error)
            } finally {
                dispatch(setLoaded(true))
            }
        }
        handleEffect()
    }, [])

    const authenticated = useAppSelector(state => state.sessionReducer.authenticated)
    const router = useRouterWithSearchParams()
    const pathname = usePathname()

    //auto navigate to home if authenticated
    useEffect(() => {
        if (!loaded) {
            return
        }
        if (neutralPages.includes(pathname)) {
            return
        }
        if (!authenticated) {
            if (!unauthenticatedPages.includes(pathname)) {
                router.push(pathConstants.signIn)
            }
            return
        }
        if (unauthenticatedPages.includes(pathname)) {
            router.push(pathConstants.home)
        }
    }, [authenticated, pathname, loaded])
}   
