import { ExtendedBadge, ExtendedTable, Image, Spacer } from "@/components"
import { TOKEN_SHEET_DISCLOSURE, useSingletonHook } from "@/singleton"
import { useAppSelector, useAppDispatch } from "@/redux"
import React, { FC } from "react"
import { valuesWithKey } from "@/modules/common"
import { ColumnDef } from "@tanstack/react-table"
import { useDisclosure } from "react-use-disclosure"
import { setTokenSheet } from "@/redux"
import { TokenKey, TokenType } from "@/types"
import { chainKeyMap } from "@/modules/blockchain"
import { envConfig } from "@/env"

export interface AssetsData {
  imageUrl: string;
  name: string;
  symbol: string;
  isNative: boolean;
}

export interface TableData {
  id: TokenKey;
  assets: AssetsData;
  balance: number;
  price: number;
}

export const TokensTab: FC = () => {
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const tokens = valuesWithKey(staticData?.tokens || {})
    const { open: openTokenSheet } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(TOKEN_SHEET_DISCLOSURE)

    const chainKey = useAppSelector((state) => state.sessionReducer.chainKey)

    const dispatch = useAppDispatch()

    const balanceSwrs = useAppSelector((state) => state.swrsReducer.balanceSwrs)

    const network = envConfig().network
    const tableData: Array<TableData> = tokens
        .map((token) => {
            const tokenData = token[chainKey]?.[network]
            if (!tokenData) return null
            return {
                id: token.key,
                assets: {
                    imageUrl: tokenData?.imageUrl ?? "",
                    name: tokenData?.name ?? "",
                    symbol: tokenData?.symbol ?? "",
                    isNative: tokenData?.tokenType === TokenType.Native,
                },
                balance: balanceSwrs[token.key]?.data?.balance.balance ?? 0,
                price: 0,
            }
        })
        .filter((token) => token !== null)

    const columns: Array<ColumnDef<TableData>> = [
        {
            accessorKey: "assets",
            header: "Assets",
            cell: ({ row }) => {
                const asset = row.original.assets
                return (
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Image
                                src={asset.imageUrl}
                                alt={asset.name}
                                className="w-10 h-10"
                            />
                            {!asset.isNative && (
                                <Image
                                    src={
                                        chainKeyMap.find((item) => item.key === chainKey)
                                            ?.iconUrl ?? ""
                                    }
                                    alt={
                                        chainKeyMap.find((item) => item.key === chainKey)?.name ??
                    ""
                                    }
                                    className="w-5 h-5 absolute bottom-0 right-0 rounded-full bg-background p-0.5"
                                />
                            )}
                        </div>
                        <div>
                            <div>{asset.name}</div>
                            <div className="text-sm text-muted-foreground">
                                {asset.symbol}
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: "balance",
            header: "Balance",
            cell: ({ row }) => {
                return <div>{row.original.balance}</div>
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                const price = row.original.price
                return (
                    <div>
                        {price
                            ? `$${price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                            })}`
                            : "-"}
                    </div>
                )
            },
        },
    ]
    return (
        <>
            {/* Native balance to track only */}
            {balanceSwrs[TokenKey.Native]?.data?.cached &&
        balanceSwrs[TokenKey.Native]?.data?.refreshInterval > 0 && (
                <>
                    <div className="text-muted-foreground text-sm flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <ExtendedBadge>Cached</ExtendedBadge>
                            <div>
                  Wait {balanceSwrs[TokenKey.Native]?.data?.refreshInterval}{" "}
                  seconds to refresh
                            </div>
                        </div>
                    </div>
                    <Spacer y={4} />
                </>
            )}
            <ExtendedTable
                data={tableData}
                columns={columns}
                showPagination={false}
                showSelectedRowText={false}
                onClickRow={(row) => {
                    dispatch(setTokenSheet({ tokenKey: row.id }))
                    openTokenSheet()
                }}
            />
        </>
    )
}
