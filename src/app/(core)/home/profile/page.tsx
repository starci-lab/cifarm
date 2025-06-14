"use client"

import { BlurEffect, Header, Spacer, Image } from "@/components"
import { createJazziconBlobUrl } from "@/modules/jazz"
import { useAppSelector } from "@/redux"
import React from "react"

const ProfilePage = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)

    return (
        <div className="relativen">
            <BlurEffect size="lg" position="top" />
            <Header title="Profile" />
            <Spacer y={6} />
            <div>
                <Image src={user?.avatarUrl || createJazziconBlobUrl(user?.id || "")} alt="Profile Picture" className="w-40 h-40 rounded-lg" />
            </div>
        </div>
    )
}

export default ProfilePage
