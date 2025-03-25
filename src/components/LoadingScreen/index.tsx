import React, { FC } from "react"
import { Container } from "../Container"

export const LoadingScreen: FC = () => {
    return (
        <Container>
            <div className="h-full w-full grid place-items-center">
                <div className="text-2xl font-bold">Loading...</div>
            </div>
        </Container>
    )
}