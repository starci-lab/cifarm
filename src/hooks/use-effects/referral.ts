import { useSingletonHook } from "@/singleton"
import { retrieveLaunchParams, postEvent } from "@telegram-apps/sdk"
import { useEffect } from "react"
import { useGraphQLMutationUpdateReferralSwrMutation } from "@/hooks"
import { GRAPHQL_MUTATION_UPDATE_REFERRAL_SWR_MUTATION } from "@/app/(core)/constantsd"

export const REFERRAL_USER_ID = "referralUserId"

export const useReferral = () => {
    const { swrMutation } = useSingletonHook<
    ReturnType<typeof useGraphQLMutationUpdateReferralSwrMutation>
  >(GRAPHQL_MUTATION_UPDATE_REFERRAL_SWR_MUTATION)
    useEffect(() => {
        const handleEffect = async () => {
            try {
                const { tgWebAppStartParam } = retrieveLaunchParams()
                postEvent("web_app_expand")
                if (tgWebAppStartParam) {
                    await swrMutation.trigger({
                        request: { referralUserId: tgWebAppStartParam },
                    })
                }
            } catch {
                // running in browser, non-telegram
                console.log("Not running in Telegram")
                // get the referralUserId from the query string
                const urlParams = new URLSearchParams(window.location.search)
                const referralUserId = urlParams.get(REFERRAL_USER_ID)
                if (referralUserId) {
                    await swrMutation.trigger({
                        request: { referralUserId },
                    })
                }
            }
        }
        handleEffect()
    }, [])
}
