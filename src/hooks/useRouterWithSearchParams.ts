
import { useRouter, usePathname } from "next/navigation"
import { formatUrl } from "url-lib"
export const useRouterWithSearchParams = () => {
    const router = useRouter()
    const pathname = usePathname()
    const push = (href: string, { mergeWithCurrentPath, params }: RouterPushOptions = {}) => {
        if (mergeWithCurrentPath) {
            const currentPath = pathname
            const newPath = formatUrl(href, params)
            // check if / do not add it
            if (newPath.startsWith("/")) {
                router.push(`${currentPath}${newPath}`)
            } else {
                router.push(`${currentPath}/${newPath}`)
            }
        } else {
            router.push(formatUrl(href, params))
        }
    }

    return {
        ...router,
        push
    }
}

export interface RouterPushOptions {
    params?: Record<string, string>
    mergeWithCurrentPath?: boolean
}
