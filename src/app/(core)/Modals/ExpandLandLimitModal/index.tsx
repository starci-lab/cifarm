import React, { FC } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    ExtendedButton,
    DialogBody,
    DialogHeader,
    DialogTitle,
    Title,
    LandLimit,
    Spacer,
    TokenIcon
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { EXPAND_LAND_LIMIT_DISCLOSURE, GRAPHQL_QUERY_STATIC_SWR, GRAPHQL_MUTATION_CREATE_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION, GRAPHQL_MUTATION_SEND_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION, SIGN_TRANSACTION_DISCLOSURE } from "@/app/(core)/constants"
import { setSignTransactionModal, TransactionType, useAppDispatch } from "@/redux"
import { useAppSelector } from "@/redux"
import { useGraphQLQueryStaticSwr, useGraphQLMutationCreateExpandLandLimitSolanaTransactionSwrMutation, useGraphQLMutationSendExpandLandLimitSolanaTransactionSwrMutation, toast, useGlobalAccountAddress } from "@/hooks"
import { TokenKey } from "@/modules/entities"
import { ChainKey } from "@/modules/blockchain"
import { envConfig } from "@/env"

export const ExpandLandLimitModal: FC = () => {
    const { isOpen, toggle } =
    useSingletonHook<ReturnType<typeof useDisclosure>>(EXPAND_LAND_LIMIT_DISCLOSURE)
    const user = useAppSelector((state) => state.sessionReducer.user)
    const { swr: staticSwr } = useSingletonHook<ReturnType<typeof useGraphQLQueryStaticSwr>>(GRAPHQL_QUERY_STATIC_SWR)
    const { swrMutation: createExpandLandLimitSwr } = useSingletonHook<ReturnType<typeof useGraphQLMutationCreateExpandLandLimitSolanaTransactionSwrMutation>>(GRAPHQL_MUTATION_CREATE_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION)
    const { swrMutation: sendExpandLandLimitSwr } = useSingletonHook<ReturnType<typeof useGraphQLMutationSendExpandLandLimitSolanaTransactionSwrMutation>>(GRAPHQL_MUTATION_SEND_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION)
    const { accountAddress } = useGlobalAccountAddress()
    const dispatch = useAppDispatch()
    const { open: openSignTransactionModal } = useSingletonHook<ReturnType<typeof useDisclosure>>(SIGN_TRANSACTION_DISCLOSURE)
    const nextLandLimitIndex = (user?.landLimitIndex ?? 0) + 1
    const network = envConfig().network
    if (!staticSwr.data) {
        return null
    }
    return (
        <Dialog
            open={isOpen}
            onOpenChange={toggle}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Expand Land Limit</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Title title="Next Land Limit" tooltipString="The next land limit you can expand to." />
                    <Spacer y={2} />
                    <LandLimit
                        tileLimit={staticSwr.data?.data.landLimitInfo.landLimits[nextLandLimitIndex].tileLimit ?? 0}
                        buildingLimit={staticSwr.data?.data.landLimitInfo.landLimits[nextLandLimitIndex].buildingLimit ?? 0}
                        fruitLimit={staticSwr.data?.data.landLimitInfo.landLimits[nextLandLimitIndex].fruitLimit ?? 0}
                        sameBuildingLimit={staticSwr.data?.data.landLimitInfo.landLimits[nextLandLimitIndex].sameBuildingLimit ?? 0}
                    />
                    <Spacer y={4} />
                    <div className="flex items-center gap-2 justify-between">
                        <Title title="Payment" tooltipString="The amount of tokens you need to pay to expand your land limit." />
                        <div className="flex items-center gap-1.5">
                            <TokenIcon
                                chainKey={ChainKey.Solana}
                                network={network}
                                tokenKey={staticSwr.data?.data.landLimitInfo.landLimits[nextLandLimitIndex].tokenKey ?? TokenKey.USDC}
                                tokens={staticSwr.data.data.tokens}
                                className="w-8 h-8"
                            />
                            <div className="text-2xl">
                                {staticSwr.data?.data.landLimitInfo.landLimits[nextLandLimitIndex].price}
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        variant="flat"
                        color="secondary"
                        isLoading={createExpandLandLimitSwr.isMutating}
                        onClick={async () => {
                            if (!accountAddress) {
                                throw new Error("No account address")
                            }
                            try {
                                const { data} = await createExpandLandLimitSwr.trigger({
                                    request: {
                                        accountAddress,
                                    }
                                })
                                if (!data) {
                                    toast({
                                        title: "Failed to create transaction",
                                        variant: "destructive",
                                    })
                                    return
                                }
                                dispatch(setSignTransactionModal({
                                    type: TransactionType.SolanaRawTx,
                                    data: {
                                        serializedTx: data.serializedTx,
                                    },  
                                    postActionHook: async (signedSerializedTx) => {
                                        const { data } = await sendExpandLandLimitSwr.trigger({
                                            request: {
                                                serializedTx: Array.isArray(signedSerializedTx) ? signedSerializedTx[0] : signedSerializedTx,
                                            },
                                        })
                                        if (!data) {
                                            toast({
                                                title: "Failed to send transaction",
                                                variant: "destructive",
                                            })
                                            return ""
                                        }
                                        return data.txHash
                                    },
                                }))
                                openSignTransactionModal()
                            } catch (error) {
                                toast({
                                    title: error instanceof Error ? error.message : "An unknown error occurred",
                                    variant: "destructive",
                                })
                            }
                        }}
                        className="w-full"
                    >
            Continue
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
