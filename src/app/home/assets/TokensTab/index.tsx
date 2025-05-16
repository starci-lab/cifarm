import { QUERY_STATIC_SWR_MUTATION, SHEET_TOKEN_DISCLOSURE } from "@/app/constants"
import { ExtendedTable, Image } from "@/components"
import { envConfig } from "@/env"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector, useAppDispatch } from "@/redux"
import React, { FC } from "react"
import { valuesWithKey } from "@/modules/common"
import { ColumnDef } from "@tanstack/react-table"
import { useDisclosure } from "react-use-disclosure"
import { setTokenSheet } from "@/redux"
import { TokenKey } from "@/modules/entities"

export interface AssetsData {
    imageUrl: string
    name: string
    symbol: string
}

export interface TableData {
    id: TokenKey
    assets: AssetsData
    balance: number
    price: number
}

export const TokensTab: FC = () => {
    const { swr: staticData } = useSingletonHook<
        ReturnType<typeof useGraphQLQueryStaticSwr>
    >(QUERY_STATIC_SWR_MUTATION)

    const network = envConfig().network
    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)
    
    const tokens = valuesWithKey(staticData.data?.data.tokens || {})

    const balanceSwrs = useAppSelector(
        (state) => state.sessionReducer.balanceSwrs
    )

    const { open: openTokenSheet } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        SHEET_TOKEN_DISCLOSURE
    )

    const dispatch = useAppDispatch()

    const tableData: Array<TableData> = tokens.map((token) => {
        const tokenData = token[chainKey]?.[network]
        console.log(token[chainKey]?.[network])
        if (!tokenData) return null
        return {
            id: token.key,
            assets: {
                imageUrl: tokenData?.imageUrl ?? "",
                name: tokenData?.name ?? "",
                symbol: tokenData?.symbol ?? ""
            },
            balance: balanceSwrs[token.key]?.data ?? 0,
            price: 0,
        }
    }).filter((token) => token !== null)

    const columns: Array<ColumnDef<TableData>> = [
        {
            accessorKey: "assets",
            header: "Assets",
            cell: ({ row }) => {
                const asset = row.original.assets
                return (
                    <div className="flex items-center gap-2">
                        <Image src={asset.imageUrl} alt={asset.name} className="w-10 h-10" />
                        <div>
                            <div>{asset.name}</div>
                            <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "balance",
            header: "Balance",
            cell: ({ row }) => {
                return <div>{row.original.balance}</div>
            }
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                const price = row.original.price
                return (
                    <div>
                        {price
                            ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                            : "-"}
                    </div>
                )
            }
        },
    ]
    return <ExtendedTable
        data={tableData}
        columns={columns}
        showPagination={false}
        showSelectedRowText={false}
        onClickRow={(row) => {
            dispatch(setTokenSheet({ tokenKey: row.id}))
            openTokenSheet()
        }}
    />
}
