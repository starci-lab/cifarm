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
    TokenIcon,
} from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import {
    EXPAND_LAND_LIMIT_MODAL_DISCLOSURE,
    GRAPHQL_MUTATION_CREATE_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION,
    GRAPHQL_MUTATION_SEND_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION,
    SIGN_TRANSACTION_MODAL_DISCLOSURE,
} from "@/singleton"
import {
    setSignTransactionModalContent,
    TransactionType,
    useAppDispatch,
} from "@/redux"
import { useAppSelector } from "@/redux"
import {
    useGraphQLMutationCreateExpandLandLimitSolanaTransactionSwrMutation,
    useGraphQLMutationSendExpandLandLimitSolanaTransactionSwrMutation,
} from "@/singleton"
import {
    useGlobalAccountAddress,
} from "@/hooks"
import { addErrorToast } from "@/components"
import { TokenKey } from "@/types"
import { ChainKey } from "@/modules/blockchain"
import { envConfig } from "@/env"

export const ExpandLandLimitModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        EXPAND_LAND_LIMIT_MODAL_DISCLOSURE
    )
    const user = useAppSelector((state) => state.apiReducer.coreApi.user)
    const staticData = useAppSelector((state) => state.apiReducer.coreApi.static)
    const { swrMutation: createExpandLandLimitSwr } = useSingletonHook<
    ReturnType<
      typeof useGraphQLMutationCreateExpandLandLimitSolanaTransactionSwrMutation
    >
  >(GRAPHQL_MUTATION_CREATE_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION)
    const { swrMutation: sendExpandLandLimitSwr } = useSingletonHook<
    ReturnType<
      typeof useGraphQLMutationSendExpandLandLimitSolanaTransactionSwrMutation
    >
  >(GRAPHQL_MUTATION_SEND_EXPAND_LAND_LIMIT_SOLANA_TRANSACTION_SWR_MUTATION)
    const { accountAddress } = useGlobalAccountAddress()
    const dispatch = useAppDispatch()
    const { open: openSignTransactionModal } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(SIGN_TRANSACTION_MODAL_DISCLOSURE)
    const nextLandLimitIndex = (user?.landLimitIndex ?? 0) + 1
    const network = envConfig().network
    if (!staticData) {
        return null
    }
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Expand Land Limit</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Title
                        classNames={{
                            title: "text-base",
                            tooltip: "text-base",
                        }}
                        title="Next Info"
                        tooltipString="The next land limit you can expand to."
                    />
                    <Spacer y={2} />
                    <LandLimit
                        tileLimit={
                            staticData?.landLimitInfo.landLimits[nextLandLimitIndex]
                                .tileLimit ?? 0
                        }
                        buildingLimit={
                            staticData?.landLimitInfo.landLimits[nextLandLimitIndex]
                                .buildingLimit ?? 0
                        }
                        fruitLimit={
                            staticData?.landLimitInfo.landLimits[nextLandLimitIndex]
                                .fruitLimit ?? 0
                        }
                        sameBuildingLimit={
                            staticData?.landLimitInfo.landLimits[nextLandLimitIndex]
                                .sameBuildingLimit ?? 0
                        }
                    />
                    <Spacer y={4} />
                    <div className="flex items-center gap-2 justify-between">
                        <Title
                            classNames={{
                                title: "text-base",
                                tooltip: "text-base",
                            }}
                            title="Payment"
                            tooltipString="The amount of tokens you need to pay to expand your land limit."
                        />
                        <div className="flex items-center gap-1.5">
                            <TokenIcon
                                chainKey={ChainKey.Solana}
                                network={network}
                                tokenKey={
                                    staticData?.landLimitInfo.landLimits[
                                        nextLandLimitIndex
                                    ].tokenKey ?? TokenKey.USDC
                                }
                                tokens={staticData.tokens}
                                className="w-8 h-8"
                            />
                            <div className="text-2xl">
                                {
                                    staticData?.landLimitInfo.landLimits[
                                        nextLandLimitIndex
                                    ].price
                                }
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton
                        isLoading={createExpandLandLimitSwr.isMutating}
                        onClick={async () => {
                            if (!accountAddress) {
                                throw new Error("No account address")
                            }
                            try {
                                const { data } = await createExpandLandLimitSwr.trigger({
                                    request: {
                                        accountAddress,
                                    },
                                })
                                dispatch(
                                    setSignTransactionModalContent({
                                        type: TransactionType.SolanaRawTx,
                                        data: {
                                            serializedTx: data?.serializedTx ?? "",
                                        },
                                        postActionHook: async (signedSerializedTx) => {
                                            try {
                                                const { data } = await sendExpandLandLimitSwr.trigger({
                                                    request: {
                                                        serializedTx: Array.isArray(signedSerializedTx)
                                                            ? signedSerializedTx[0]
                                                            : signedSerializedTx,
                                                    },
                                                })
                                                return data?.txHash ?? ""
                                            } catch (error) {
                                                addErrorToast({
                                                    errorMessage: (error as Error).message,
                                                })
                                                return ""
                                            }
                                        },
                                    })
                                )
                                openSignTransactionModal()
                            } catch (error) {
                                addErrorToast({
                                    errorMessage: (error as Error).message,
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
