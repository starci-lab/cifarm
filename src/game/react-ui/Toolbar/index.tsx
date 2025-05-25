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
    assetUiMap,
    AssetUIId,
} from "@/modules/assets"
import { useMediaQuery } from "usehooks-ts"
import { InventoryKind, ToolId } from "@/modules/entities"
import { ExternalEventName, ToolLike, ExternalEventEmitter } from "@/modules/event-emitter"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

export const Toolbar: FC = () => {
    const { swr: staticSwr } = useSingletonHook<
    ReturnType<typeof useGraphQLQueryStaticSwr>
  >(QUERY_STATIC_SWR_MUTATION)
    const inventories = useAppSelector(
        (state) => state.sessionReducer.inventories
    ).filter((inventory) => inventory.kind === InventoryKind.Tool)

    const [numVisibleInventories, setNumVisibleInventories] = useState(6)
    const isSmallScreen = useMediaQuery("(max-width: 640px)") // Tailwind `sm` breakpoint

    useEffect(() => {
        if (isSmallScreen) {
            setNumVisibleInventories(3)
        } else {
            setNumVisibleInventories(5)
        }
    }, [isSmallScreen, setNumVisibleInventories])

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
            .sort((prev, next) => prev.index - next.index)
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

    useEffect(() => {
        //check if selected tool is out of the filtered tools
        if (!filteredTools.some((tool) => tool.id === selectedToolId)) {
            dispatch(setSelectedToolId(filteredTools[0].id))
        }
    }, [filteredTools, selectedToolId])

    useEffect(() => {
        ExternalEventEmitter.on(ExternalEventName.RequestSelectTool, () => {
            ExternalEventEmitter.emit(ExternalEventName.SelectTool, {
                tool: filteredTools[0]
            })
        })
        return () => {
            ExternalEventEmitter.off(ExternalEventName.RequestSelectTool)
        }
    }, [filteredTools])

    return (
        <div className="flex gap-2 items-center bg-content-4 rounded-t-lg p-2 fixed left-1/2 -translate-x-1/2 bottom-0 scale-75 origin-bottom sm:scale-100">
            <ExtendedButton
                color="secondary"
                size="icon"
                variant="flat"
                disabled={fromToolIndex === 0}
                onClick={() => {
                    dispatch(setFromToolIndex(fromToolIndex - 1))
                }}
            >
                <CaretLeft className="w-5 h-5" />
            </ExtendedButton>
            <div className="flex gap-2 rounded-md">
                {filteredTools.map((toolLike) => {
                    if (toolLike.default) {
                        return (
                            <div className="relative" key={toolLike.id}>
                                <ItemCard
                                    hideCardContentBg={false}
                                    onClick={() => {
                                        dispatch(setSelectedToolId(toolLike.id))
                                    }}
                                    key={toolLike.id}
                                    frameOnly={false}
                                    quantity={toolLike.quantity}
                                    imageUrl={assetToolsMap[toolLike.id as ToolId]?.base.assetUrl}
                                    isSelected={toolLike.id === selectedToolId}
                                />
                                {toolLike.id === selectedToolId && (
                                    <ScaledImage
                                        src={assetUiMap[AssetUIId.SelectedArrow].base.assetUrl}
                                        className="absolute -top-12 left-1/2 -translate-x-1/2"
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
                                isQuality={(() => {
                                    const product = staticSwr.data?.data.products.find(
                                        (product) => product.id === inventoryType?.product
                                    )
                                    return product?.isQuality
                                })()}
                                isSelected={toolLike.id === selectedToolId}
                                hideCardContentBg={true}
                                frameOnly={false}
                            />
                            {toolLike.id === selectedToolId && (
                                <ScaledImage
                                    src={assetUiMap[AssetUIId.SelectedArrow].base.assetUrl}
                                    className="absolute -top-12 left-1/2 -translate-x-1/2"
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            <ExtendedButton
                color="secondary"
                size="icon"
                variant="flat"
                disabled={fromToolIndex >= inventories.length - numVisibleInventories}
                onClick={() => {
                    dispatch(setFromToolIndex(fromToolIndex + 1))
                }}
            >
                <CaretRight className="w-5 h-5" />
            </ExtendedButton>
        </div>
    )
}
