import { Spinner } from "@heroui/react"
import React, { FC } from "react"
import { Container } from "../Container"

export const LoadingScreen: FC = () => {
    return (
        <Container>
            <div className="h-full w-full grid place-items-center">
                <Spinner size="lg" label="Loading..." />
            </div>
        </Container>
    )
}
