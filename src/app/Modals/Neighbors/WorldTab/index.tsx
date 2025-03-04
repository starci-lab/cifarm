import { QUERY_NEIGHBORS_SWR } from "@/app/constants"
import { useQueryNeighborsSwr } from "@/hooks"
import { useSingletonHook } from "@/modules/singleton-hook"
import { Card, Divider } from "@heroui/react"
import React, { FC } from "react"
import { UserCard } from "../UserCard"

export const WorldTab: FC = () => {
    const { swr: { data } } = useSingletonHook<ReturnType<typeof useQueryNeighborsSwr>>(QUERY_NEIGHBORS_SWR)
    const neighbors = data?.data.neighbors.data || []
    console.log(neighbors)
    return (<Card>
        {neighbors.map((neighbor, index) => {
            const last = index === neighbors.length - 1
            return (
                <>
                    <UserCard user={neighbor} />
                    {!last && <Divider />}
                </>
            )
        })}
    </Card>)
}
