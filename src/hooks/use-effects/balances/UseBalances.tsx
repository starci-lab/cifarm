import React from "react"
import { useAppSelector } from "@/redux"
import { valuesWithKey } from "@/modules/common"
import { BalanceComponent } from "./Component"
export const UseBalances = () => {
    const tokens = useAppSelector((state) => state.sessionReducer.tokens)
    const tokensArray = valuesWithKey(tokens)

    return (
        <>
            {tokensArray.map((token) => (
                <BalanceComponent
                    key={token.key}
                    tokenKey={token.key}
                />
            ))}
        </>
    )
}