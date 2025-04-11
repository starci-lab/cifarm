import { FC, useEffect, useState } from "react"
import {
    setFromToolIndex,
    setSelectedToolId,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { ExtendedButton, ItemCard, ScaledImage } from "@/components"
import React from "react"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useGraphQLQueryStaticSwr } from "@/hooks"
import { QUERY_STATIC_SWR_MUTATION } from "@/app/constants"
import {
    assetInventoryTypesMap,
    assetToolsMap,
    AssetUI,
    assetUiMap,
} from "@/modules/assets"
import { useMediaQuery } from "usehooks-ts"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { ToolId } from "@/modules/entities"
import { ExternalEventName } from "@/game"
import { ExternalEventEmitter } from "@/game"

export interface ToolLike {
  id: string;
  quantity?: number;
  default?: boolean;
  stackable?: boolean;
}

export const Toolbar: FC = () => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const inventories = useAppSelector(
        (state) => state.sessionReducer.inventories
    )
    const [numVisibleInventories, setNumVisibleInventories] = useState(6)
    const isSmallScreen = useMediaQuery("(max-width: 640px)") // Tailwind `sm` breakpoint

    useEffect(() => {
        if (isSmallScreen) {
            setNumVisibleInventories(4)
        } else {
            setNumVisibleInventories(6)
        }
    }, [isSmallScreen])

    const dispatch = useAppDispatch()
    const fromToolIndex =
    useAppSelector((state) => state.sessionReducer.fromToolIndex) ?? 0
    const selectedToolId = useAppSelector(
        (state) => state.sessionReducer.selectedToolId
    )

    const defaultTools: Array<ToolLike> =
    staticSwr.data?.data.tools
        .filter((tool) => tool.default)
        .map((tool) => ({
            id: tool.displayId,
            default: true,
            stackable: true,
        })) ?? []

    const filteredTools: Array<ToolLike> = []
    filteredTools.push(...defaultTools)
    filteredTools.push(
        ...inventories
            .slice(fromToolIndex, fromToolIndex + numVisibleInventories)
            .map((inventory) => ({
                id: inventory.id,
                default: false,
                quantity: inventory.quantity,
            }))
    )

    const [selectAsDefault, setSelectAsDefault] = useState(false)
    useEffect(() => {
        if (!selectAsDefault && filteredTools.length > 0) {
            dispatch(setSelectedToolId(filteredTools[0].id))
            setSelectAsDefault(true)
        }
    }, [filteredTools])

    useEffect(() => {
        if (!selectedToolId) {
            return
        }
        ExternalEventEmitter.emit(ExternalEventName.SelectTool, {
            tool: filteredTools.find((tool) => tool.id === selectedToolId)
        })
        
    }, [selectedToolId])

    return (
        <div className="flex gap-2 items-center">
            <ExtendedButton
                variant="ghost"
                size="icon"
                className="bg-background/50"
                disabled={fromToolIndex === 0}
                onClick={() => {
                    dispatch(setFromToolIndex(fromToolIndex - 1))
                }}
            >
                <ChevronLeftIcon className="w-5 h-5" />
            </ExtendedButton>
            <div className="flex gap-2 p-2 bg-background/50 rounded-md">
                {filteredTools.map((toolLike) => {
                    if (toolLike.default) {
                        return (
                            <div className="relative" key={toolLike.id}>
                                <ItemCard
                                    classNames={{
                                        card: "",
                                    }}
                                    onClick={() => {
                                        dispatch(setSelectedToolId(toolLike.id))
                                    }}
                                    key={toolLike.id}
                                    quantity={toolLike.quantity}
                                    imageUrl={assetToolsMap[toolLike.id as ToolId]?.base.assetUrl}
                                    faded={toolLike.id !== selectedToolId}
                                    hideCardContentBg={true}
                                    frameOnly={false}
                                />
                                {toolLike.id === selectedToolId && (
                                    <ScaledImage
                                        src={assetUiMap[AssetUI.SelectedArrow].base.assetUrl}
                                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                                    />
                                )}
                            </div>
                        )
                    }
                    const inventory = inventories.find((inventory) => inventory.id === toolLike.id)
                    if (!inventory) throw new Error("Inventory not found")
                    const inventoryType = staticSwr.data?.data.inventoryTypes.find(
                        (inventoryType) => inventoryType.id === inventory.inventoryType
                    )
                    if (!inventoryType) throw new Error("Inventory type not found")
                    return (
                        <div className="relative" key={toolLike.id}>
                            <ItemCard
                                classNames={{
                                    card: "",
                                }}
                                onClick={() => {
                                    dispatch(setSelectedToolId(toolLike.id))
                                }}
                                stackable={inventoryType.stackable}
                                quantity={toolLike.quantity}
                                imageUrl={
                                    assetInventoryTypesMap[inventoryType.displayId]?.base.assetUrl
                                }
                                faded={toolLike.id !== selectedToolId}
                                hideCardContentBg={true}
                                frameOnly={false}
                            />
                            {toolLike.id === selectedToolId && (
                                <ScaledImage
                                    src={assetUiMap[AssetUI.SelectedArrow].base.assetUrl}
                                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            <ExtendedButton
                variant="ghost"
                size="icon"
                className="bg-background/50"
                disabled={fromToolIndex === inventories.length - numVisibleInventories}
                onClick={() => {
                    dispatch(setFromToolIndex(fromToolIndex + 1))
                }}
            >
                <ChevronRightIcon className="w-5 h-5" />
            </ExtendedButton>
        </div>
    )
}
