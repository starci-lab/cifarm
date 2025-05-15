"use client"

import { GRAPHQL_MUTATION_UPDATE_PROFILE_SWR_MUTATION, GRAPHQL_QUERY_USER_SWR } from "@/app/constants"
import { BlurEffect, ExtendedButton, Header, Spacer } from "@/components"
import { useGraphQLMutationUpdateProfileSwrMutation, useGraphQLQueryUserSwr } from "@/hooks"
import { ExternalEventName } from "@/modules/event-emitter"
import { ExternalEventEmitter } from "@/modules/event-emitter"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useAppSelector } from "@/redux"
import React from "react"

const ProfilePage = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)

    const handleClick =() => {

        console.log("handle click")


        ExternalEventEmitter.emit(ExternalEventName.RequestUpdateProfile, {
            username: "Testin 2",
            avatarUrl: "https://example.com/avatar.png",
        })
    }
    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" />
            <Header title="Profile" />
            <Spacer y={4} />

            {
                user?.username
            }

            <div>
                <ExtendedButton onClick={handleClick}>
                    Hello
                </ExtendedButton>
            </div>
        </div>
    )
}

export default ProfilePage
