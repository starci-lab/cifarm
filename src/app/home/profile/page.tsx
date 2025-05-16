"use client"

import { BlurEffect, ExtendedButton, Header, Spacer } from "@/components"
import React from "react"

const ProfilePage = () => {
    // const user = useAppSelector((state) => state.sessionReducer.user)

    const handleClick =() => {

        console.log("handle click")


        // ExternalEventEmitter.emit(ExternalEventName.RequestUpdateProfile, {
        //     username: "Testin 2",
        //     avatarUrl: "https://example.com/avatar.png",
        // })
    }
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" />
            <Header title="Profile" />
            <Spacer y={4} />

            <div>
                <ExtendedButton onClick={handleClick}>
                    Hello
                </ExtendedButton>
            </div>
        </div>
    )
}

export default ProfilePage
