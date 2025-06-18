import { useSingletonHook } from "@/singleton"
import { useGraphQLMutationRefreshSwrMutation } from "@/singleton"
import { GRAPHQL_MUTATION_REFRESH_SWR_MUTATION, WELCOME_MODAL_DISCLOSURE } from "@/singleton"
import { useEffect } from "react"
import { sessionDb, SessionDbKey } from "@/modules/dexie"
import { saveTokens } from "@/modules/apollo"
import { setAuthenticated, setLoaded, useAppDispatch, 
    useAppSelector
} from "@/redux"
import { neutralPages, pathConstants, unauthenticatedPages } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { usePathname } from "next/navigation"
//import { pathConstants } from "@/constants"
import { useDisclosure } from "react-use-disclosure"


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
                    // mean that the token cannot be used
                    // we delete the tokens
                    await sessionDb.keyValueStore.delete(SessionDbKey.RefreshToken)
                    await sessionDb.keyValueStore.delete(SessionDbKey.AccessToken)
                    return
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

    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(WELCOME_MODAL_DISCLOSURE)
    useEffect(() => {
        if (!authenticated) {
            return
        }
        open()
    }, [authenticated])
}   
