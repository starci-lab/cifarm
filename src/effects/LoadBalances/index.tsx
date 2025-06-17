import React, { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { TokenKey } from "@/types"
import { useLoadBalances } from "./useLoadBalances"

export const LoadBalances = () => {
    const pathname = usePathname()
    const [tokenKeys, setTokenKeys] = useState<Array<TokenKey>>([])

    const loadBalancesRef = useRef<boolean>(false)
    useEffect(() => {
        if (pathname.includes("assets") && !loadBalancesRef.current) {
            setTokenKeys([TokenKey.Native, TokenKey.USDC, TokenKey.USDT, TokenKey.CIFARM])
            loadBalancesRef.current = true
        }
    }, [pathname])

    return (
        tokenKeys.map((tokenKey) => (
            <LoadBalance key={tokenKey} tokenKey={tokenKey} />
        ))
    )
}

export const LoadBalance = ({ tokenKey }: { tokenKey: TokenKey }) => {
    useLoadBalances(tokenKey)
    return null
}