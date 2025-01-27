
import { useRouter, useSearchParams } from "next/navigation"

export const useRouterWithSearchParams = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const empty = Array(searchParams.keys()).length
    const push = (href: string) =>
        empty ? router.push(`${href}?${searchParams.toString()}`) : router.push(href)

    return {
        ...router,
        push
    }
}