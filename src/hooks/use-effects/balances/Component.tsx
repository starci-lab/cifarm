// component to fetch the balance of a token via SWR
import React, { useEffect } from "react"
import { useBalanceSwr } from "./useBalanceSwr"
import { removeBalance, setBalance } from "@/redux/slices/session"
import { useAppDispatch } from "@/redux"

interface BalanceComponentProps {
  tokenKey: string;
  useHoneycombProtocol?: boolean;
}

export const BalanceComponent = ({
    tokenKey,
    useHoneycombProtocol,
}: BalanceComponentProps) => {
    const dispatch = useAppDispatch()
    const { swr } = useBalanceSwr({
        useHoneycombProtocol,
        tokenKey,
    })

    useEffect(() => {
        dispatch(
            setBalance({
                tokenKey,
                balance: { amount: swr.data || 0, isLoading: swr.isValidating },
            })
        )
    }, [swr.data])

    useEffect(() => {
        return () => {
            dispatch(removeBalance(tokenKey))
        }
    }, [])

    return <></>
}
