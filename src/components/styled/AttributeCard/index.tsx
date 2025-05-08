import { Spacer } from "@/components"
import { Title } from "@/components"
import React, { FC } from "react"

interface AttributeCardProps {
    title: string
    tooltipString: string
    value: string
}

export const AttributeCard: FC<AttributeCardProps> = ({ title, tooltipString, value }) => {
    return (
        <div className="px-2 py-3 rounded-lg bg-content1">
            <Title title={title} tooltipString={tooltipString} classNames={{
                title: "text-sm text-muted-foreground font-normal",
                tooltip: "w-[14px] h-[14px] text-muted-foreground",
            }} />
            <Spacer y={4} />
            <div className="text-xl font-bold">
                {value}
            </div>
        </div>
    )
}
