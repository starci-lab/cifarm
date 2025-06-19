import {
    EDIT_DISPLAY_INFORMATION_MODAL_DISCLOSURE,
    EDIT_DISPLAY_INFORMATION_FORMIK,
    EDIT_AVATAR_MODAL_DISCLOSURE,
    useSingletonHook,
} from "@/singleton"
import {
    Button,
    Dialog,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ExtendedButton,
    ExtendedInput,
    Image,
    Spacer,
    Title,
} from "@/components"
import { useDisclosure } from "react-use-disclosure"
import React, { FC, useEffect } from "react"
import { useAppSelector } from "@/redux"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { Camera } from "@phosphor-icons/react"
import {
    useEditDisplayInformationFormik,
    useSingletonHook2,
} from "@/singleton"

export const EditDisplayInfomationModal: FC = () => {
    const { isOpen, toggle } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        EDIT_DISPLAY_INFORMATION_MODAL_DISCLOSURE
    )
    const formik = useSingletonHook2<
    ReturnType<typeof useEditDisplayInformationFormik>
  >(EDIT_DISPLAY_INFORMATION_FORMIK)
    const { open: openEditAvatar } = useSingletonHook<
    ReturnType<typeof useDisclosure>
  >(EDIT_AVATAR_MODAL_DISCLOSURE)
    const user = useAppSelector((state) => state.apiReducer.coreApi.user)
    // use effect to set the formik values
    useEffect(() => {
        if (!user) return
        formik.setValues({
            username: user.username,
            avatarUrl: user.avatarUrl || "",
        })
    }, [user])

    const getAvatarUrl = () => {
        if (formik.values.imageFile) {
            return URL.createObjectURL(formik.values.imageFile)
        }
        if (formik.values.avatarUrl) {
            return formik.values.avatarUrl
        }
        return createJazziconBlobUrl(user?.id || "")
    }

    // when click upload button, open the file input
    return (
        <Dialog open={isOpen} onOpenChange={toggle}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Display Infomation</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <div className="flex items-center gap-4 w-full justify-between">
                        <Image
                            src={getAvatarUrl()}
                            alt="Profile Picture"
                            className="w-20 h-20 aspect-square border border-muted-foreground/10 rounded-lg"
                        />
                        <Button color="secondary" variant="flat" onClick={openEditAvatar}>
                            <Camera />
              Edit
                        </Button>
                    </div>
                    <Spacer y={4} />
                    <div>
                        <Title
                            title="Username"
                            tooltipString="The username you want to display on your profile."
                        />
                        <Spacer y={2} />
                        <ExtendedInput
                            value={formik.values.username}
                            onValueChange={(value) => formik.setFieldValue("username", value)}
                            errorMessage={formik.errors.username}
                            placeholder="Enter your username"
                            isInvalid={!!formik.errors.username}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <ExtendedButton color="secondary" variant="flat" className="flex-1"
                        onClick={() => {
                            formik.setValues({
                                username: user?.username || "",
                                avatarUrl: user?.avatarUrl || "",
                                imageFile: undefined,
                                isImageUrlValid: false,
                            })
                        }}>
            Reset
                    </ExtendedButton>
                    <ExtendedButton color="primary" className="flex-1"
                        disabled={!formik.isValid}
                        isLoading={formik.isSubmitting}
                        onClick={() => formik.handleSubmit()}>
            Save
                    </ExtendedButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
