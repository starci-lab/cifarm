import {
    EDIT_AVATAR_MODAL_DISCLOSURE,
    useSingletonHook,
    useSingletonHook2,
    useEditDisplayInformationFormik,
    EDIT_DISPLAY_INFORMATION_FORMIK,
} from "@/singleton"
import {
    AppTabs,
    Dialog,
    DialogBody,
    DialogContent,
    DialogHeader,
    DialogTitle,
    ExtendedInput,
    Button,
    DialogFooter,
    Spacer,
    Spinner,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import React, { FC, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux"
import { EditAvatarModalTab, setEditAvatarModalTab } from "@/redux/slices"
import useSWRMutation from "swr/mutation"
import { Dropzone } from "@/components"

export const EditAvatarModal: FC = () => {
    const { isOpen, toggle, close } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        EDIT_AVATAR_MODAL_DISCLOSURE
    )
    const formik = useSingletonHook2<
    ReturnType<typeof useEditDisplayInformationFormik>
  >(EDIT_DISPLAY_INFORMATION_FORMIK)
    const tab = useAppSelector((state) => state.modalReducer.editAvatarModal.tab)
    // when click upload button, open the file input
    const dispatch = useAppDispatch()

    const onDrop = (acceptedFiles: Array<File>) => {
        // Do something with the files
        // we update the avatar url
        if (!acceptedFiles.length) return
        formik.setFieldValue("imageFile", acceptedFiles.at(0))
        // close the modal
        close()
    }
    const renderTabContent = () => {
        switch (tab) {
        case EditAvatarModalTab.URL:
            return (
                <>
                    <DialogBody>
                        <ExtendedInput
                            value={formik.values.avatarUrl}
                            onValueChange={(value) =>
                                formik.setFieldValue("avatarUrl", value)
                            }
                            placeholder="Enter your avatar URL"
                        />
                        {checkImageUrlValidSwrMutation.isMutating && (
                            <>
                                <Spacer y={2} />
                                <div className="flex items-center gap-2">
                                    <Spinner className="text-muted-foreground" />
                                    <div className="text-muted-foreground">
                      Checking image URL...
                                    </div>
                                </div>
                            </>
                        )}
                        {formik.errors.isImageUrlValid && (
                            <>
                                <Spacer y={2} />
                                <div className="text-red-500">
                                    {formik.errors.isImageUrlValid}
                                </div>
                            </>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            color="primary"
                            className="flex-1"
                            disabled={
                                checkImageUrlValidSwrMutation.isMutating ||
                  !formik.values.isImageUrlValid
                            }
                            onClick={() => {
                                // we update the avatar url
                                formik.setFieldValue("avatarUrl", formik.values.avatarUrl)
                                formik.setFieldValue("imageFile", undefined)
                                // close the modal
                                close()
                            }}
                        >
                Confirm
                        </Button>
                    </DialogFooter>
                </>
            )
        case EditAvatarModalTab.LocalFile:
            return (
                <DialogBody>
                    <Dropzone onDrop={onDrop} 
                        dragMessage="Drag an image here or click to select a file"
                        dropMessage="Drop the image here..."
                    />
                </DialogBody>
            )
        }
    }

    // a function to check if the image url is valid
    const checkImageUrlValid = async (): Promise<boolean> => {
        return new Promise((resolve) => {
            const image = new Image()
            image.src = formik.values.avatarUrl
            image.onload = () => {
                formik.setFieldValue("isImageUrlValid", true)
                resolve(true)
            }
            image.onerror = () => {
                formik.setFieldValue("isImageUrlValid", false)
                resolve(false)
            }
        })
    }
    const checkImageUrlValidSwrMutation = useSWRMutation(
        "CHECK_IMAGE_URL_VALID",
        async () => {
            return await checkImageUrlValid()
        }
    )
    useEffect(() => {
    // we use 1s delay to check if the image url is valid
        if (!formik.values.avatarUrl) return
        const timeout = setTimeout(() => {
            checkImageUrlValidSwrMutation.trigger()
        }, 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, [formik.values.avatarUrl])

    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Avatar</DialogTitle>
                </DialogHeader>
                <DialogBody className="pb-0">
                    <AppTabs
                        classNames={{
                            list: "w-full",
                        }}
                        selectedTab={tab}
                        tabs={[
                            {
                                label: "URL",
                                value: EditAvatarModalTab.URL,
                            },
                            {
                                label: "Local File",
                                value: EditAvatarModalTab.LocalFile,
                            },
                        ]}
                        onSelectTab={(tab) => {
                            dispatch(setEditAvatarModalTab(tab as EditAvatarModalTab))
                        }}
                    />
                </DialogBody>
                {renderTabContent()}
            </DialogContent>
        </Dialog>
    )
}
