import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { formatUrl } from "url-lib"

export const useRouterWithSearchParams = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const push = (
        href: string,
        { 
            mergeWithCurrentPath, 
            params,
            keepSearchParams
        }: RouterPushOptions = {}
    ) => {
        let url = href
        if (mergeWithCurrentPath) {
            // check if / do not add it
            if (href.startsWith("/")) {
                url = `${pathname}${href}`
            } else {
                url = `${pathname}/${href}`
            }
        }
        if (keepSearchParams) {
            url = `${pathname}?${searchParams.toString()}`
        }
        router.push(formatUrl(url, params))
    }

    return {
        ...router,
        push,
    }
}

export interface RouterPushOptions {
  params?: Record<string, string>;
  mergeWithCurrentPath?: boolean;
  keepSearchParams?: boolean;
}
