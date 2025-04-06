import React, { FC, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    ModalHeader,
    Progress,
} from "@/components"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { DOWNLOAD_PACKAGE_MODAL_DISCLOSURE } from "@/app/constants"
import { fruitAssetMap } from "@/game/assets"
import {
    addDownloadProgress,
    setTotalDownloadBytes,
    setDownloadCompleted,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import { downloadTexture, getBytes } from "./download"
import { sessionDb } from "@/modules/dexie"
import bytes from "bytes"
import { ExtendedButton, Spacer } from "@/components"

export const DownloadPackageModal: FC = () => {
    const { toggle, isOpen } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        DOWNLOAD_PACKAGE_MODAL_DISCLOSURE
    )
    const downloadPackageModal = useAppSelector(
        (state) => state.modalReducer.downloadPackageModal
    )

    const { downloadProgresses, totalDownloadBytes, downloadCompleted } =
    useAppSelector((state) => state.downloadReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!downloadPackageModal.packageId) return
        const handleEffect = async () => {
            try {
                const fruitTextureConfigs = Object.values(fruitAssetMap)
                    .flatMap((fruit) =>
                        Object.values(fruit.map).map((stage) => {
                            if (!stage.textureConfig) {
                                throw new Error("Texture config is undefined")
                            }
                            return stage.textureConfig
                        })
                    )
                    .filter(
                        (textureConfig) =>
                            textureConfig.packageId === downloadPackageModal.packageId
                    )
                const bytesMap = await getBytes(fruitTextureConfigs)
                console.log(bytesMap)
                dispatch(setTotalDownloadBytes(bytesMap))
                for (const textureConfig of fruitTextureConfigs) {
                    await downloadTexture(textureConfig, (key, data) => {
                        dispatch(addDownloadProgress({ key, data }))
                    })
                }
                await sessionDb.packages.add({
                    packageId: downloadPackageModal.packageId || 0,
                })
                dispatch(setDownloadCompleted(true))
            } catch (error) {
                console.error(error)
            }
        }
        handleEffect()
    }, [downloadPackageModal.packageId])
    const downloadedBytes = Object.entries(downloadProgresses).reduce(
        (acc, [key, data]) => {
            const bytes = totalDownloadBytes[key]
            if (!bytes) return acc
            return acc + data.progress * bytes
        },
        0
    )
    const totalBytes = Object.values(totalDownloadBytes).reduce((acc, curr) => acc + curr, 0)
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <ModalHeader
                            title="Download Package"
                            description="Download the package..."
                        />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <Progress value={(downloadedBytes / totalBytes) * 100} />
                    <Spacer y={2} />
                    <div>
                        {`${bytes(downloadedBytes)} / ${bytes(totalBytes)}`}
                    </div>
                    {downloadCompleted && (
                        <>
                            <Spacer y={4} />
                            <div>
                                <div className="text-muted-foreground text-sm">
                  Download completed. Please restart the game to see the
                  changes.
                                </div>
                                <Spacer y={1.5} />
                                <ExtendedButton
                                    className="w-full"
                                    onClick={() => {
                                        window.location.reload()
                                    }}
                                >
                  Restart
                                </ExtendedButton>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
