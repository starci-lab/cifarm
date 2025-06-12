import { Title, List, Card, CardHeader, CardBody } from "@/components"
import React, { FC, ReactNode } from "react"

export interface LandLimitProps {
    tileLimit: ReactNode
    buildingLimit: ReactNode
    fruitLimit: ReactNode
    sameBuildingLimit: ReactNode
    isGrid?: boolean
}

export const LandLimit: FC<LandLimitProps> = ({
    tileLimit,
    buildingLimit,
    fruitLimit,
    sameBuildingLimit,
    isGrid = false,
}) => {
    const limits = [
        {
            title: "Tile",
            description: "The number of tiles you can build on your land.",
            value: tileLimit,
        },
        {
            title: "Building",
            description: "The number of buildings you can build on your land.",
            value: buildingLimit,
        },
        {
            title: "Fruit",
            description: "The number of fruits you can build on your land.",
            value: fruitLimit,
        },
        {
            title: "Same building",
            description: "The number of same buildings you can build on your land.",
            value: sameBuildingLimit,
        },
    ]

    return (
        <>
            {isGrid ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {limits.map((item, index) => (
                        <Card key={index} className="w-full">
                            <CardHeader className="px-4 py-3">
                                <Title
                                    classNames={{
                                        title: "text-muted-foreground",
                                        tooltip: "text-muted-foreground",
                                    }}
                                    title={item.title}
                                    tooltipString={item.description}
                                />
                            </CardHeader>
                            <CardBody className="px-4 py-3">
                                <div className="text-4xl">{item.value}</div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            ) : (
                <List
                    items={limits}
                    enableScroll={false}
                    contentCallback={(item) => (
                        <div className="w-full justify-between flex items-center px-3 py-2 bg-content-2">
                            <Title
                                title={item.title}
                                tooltipString={item.description}
                            />
                            <div>{item.value}</div>
                        </div>
                    )}
                />
            )}
        </>
    )
}