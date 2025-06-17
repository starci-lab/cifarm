import { DOWNLOADING_MODAL_DISCLOSURE } from "@/singleton"
import { PressableCard, Spacer } from "@/components"
import { useSingletonHook } from "@/singleton"
import { useDisclosure } from "react-use-disclosure"
import React, { FC } from "react"
import { setDownloadPackageId } from "@/redux"
import { useAppDispatch } from "@/redux"
import { sessionDb } from "@/modules/dexie"

import useSWR from "swr"
export interface DownloadPackageProps {
    packageId: string
    name: string
    description: string
}
export const DownloadPackage: FC<DownloadPackageProps> = ({ packageId, name, description }) => {
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(DOWNLOADING_MODAL_DISCLOSURE)
    const dispatch = useAppDispatch()

    const downloadSwr = useSWR(packageId, async (key) => {
        const _package = await sessionDb.packages.filter((_package) => _package.packageId === parseInt(key)).first()
        return !!_package
    })
    return (
        <PressableCard isLoading={downloadSwr.isLoading} disabled={downloadSwr.data} onClick={() => {
            dispatch(setDownloadPackageId(packageId))
            open()
        }}>
            <div className="w-full justify-between items-center">
                <div>
                    <div className="text-secondary text-lg">{name}</div>
                    <div className="text-sm text-muted-foreground">{description}</div>
                </div>
                {
                    downloadSwr.data && (
                        <>
                            <Spacer y={2} />
                            <div className="text-sm text-muted-foreground italic">
                                Downloaded
                            </div>
                        </>
                    )
                }
            </div>
        </PressableCard>
    )
}
