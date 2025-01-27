"use client"
import React, { createContext, FC, PropsWithChildren } from "react"
import {
    HookReturnMap,
    useSingletonHookRegistry,
} from "./useSingletonHook"

interface SingletonHookValue {
  singletonHookRegistry: ReturnType<typeof useSingletonHookRegistry>;
}

export const SingletonHookContext = createContext<SingletonHookValue | null>(
    null
)

export interface SingletonHookProviderProps extends PropsWithChildren {
  hooks?: HookReturnMap;
}

export const SingletonHookProvider: FC<SingletonHookProviderProps> = ({
    children,
    hooks = {},
}: SingletonHookProviderProps) => {
    const singletonHookRegistry = useSingletonHookRegistry(hooks)
    return (
        <SingletonHookContext.Provider value={{ singletonHookRegistry }}>
            {children}
        </SingletonHookContext.Provider>
    )
}
