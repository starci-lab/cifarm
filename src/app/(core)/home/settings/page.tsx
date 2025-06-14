"use client"

import { BlurEffect, ExtendedButton, Header, Spacer } from "@/components"
import { useAppSelector } from "@/redux"
import { useState } from "react"
import React from "react"
const ProfilePage = () => {
    const user = useAppSelector((state) => state.sessionReducer.user)
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(true)
    // You can implement navigation or modal opening logic here
    }

    return (
        <div className="relative">
            <BlurEffect size="lg" position="top" />
            <Header title="Settings" />
            <Spacer y={4} />
            <div>

            </div>
        </div>
    )
}

export default ProfilePage
