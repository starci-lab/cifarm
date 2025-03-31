"use client"
import { Container, Header, Spacer, PressableCard, List } from "@/components"
import { FileLock2Icon, KeyIcon } from "lucide-react"
import React, { FC, ReactNode } from "react"

export enum ImportMethod {
    Mnemonic = "mnemonic",
    PrivateKey = "privateKey",
}
const Page: FC = () => {
    return (
        <Container hasPadding>
            <div className="h-full">
                <Header title="Import account" description="Import your account from existing credentials." />
                <Spacer y={6} />
                <List items={Object.values(ImportMethod)} 
                    contentCallback={(item) => {
                        const map: Record<ImportMethod, ReactNode> = {
                            [ImportMethod.Mnemonic]: <PressableCard showBorder={false} className="flex items-center gap-2 rounded-none">
                                <FileLock2Icon className="w-5 h-5"/>
                                <div className="text-sm">Import from mnemonic</div>
                            </PressableCard>,
                            [ImportMethod.PrivateKey]: <PressableCard showBorder={false} className="flex items-center gap-2 rounded-none">
                                <KeyIcon className="w-5 h-5" />
                                <div className="text-sm">Import from private key</div>
                            </PressableCard>,
                        }
                        return map[item]
                    }}/>
            </div>
        </Container>
    )
}

export default Page
