import {
    IconWrapper,
    Image,
} from "@/components"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useAppSelector } from "@/redux"
import { useSingletonHook } from "@/singleton"
import { EDIT_DISPLAY_INFORMATION_MODAL_DISCLOSURE } from "@/singleton/keys"
import { Pencil } from "@phosphor-icons/react"
import React, { FC } from "react"
import { useDisclosure } from "react-use-disclosure"

export const DisplayInfomation: FC = () => {
    const user = useAppSelector((state) => state.apiReducer.coreApi.user)
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(
        EDIT_DISPLAY_INFORMATION_MODAL_DISCLOSURE
    )
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Image
                    src={user?.avatarUrl || createJazziconBlobUrl(user?.id || "")}
                    alt="Profile Picture"
                    className="w-20 h-20 aspect-square rounded-lg"
                />
                <div>
                    <div className="text-2xl">
                        {user?.username}
                    </div>
                </div>
            </div>
            <IconWrapper
                classNames={{
                    base: "text-secondary",
                }}
            >
                <Pencil onClick={open} />
            </IconWrapper>
        </div>
    )
}
