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

export const SingletonHook2Context = createContext<SingletonHookValue | null>(
    null
)

export const SingletonHook3Context = createContext<SingletonHookValue | null>(
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

export const SingletonHook2Provider: FC<SingletonHookProviderProps> = ({
    children,
    hooks = {},
}: SingletonHookProviderProps) => {
    const singletonHookRegistry = useSingletonHookRegistry(hooks)
    return (
        <SingletonHook2Context.Provider value={{ singletonHookRegistry }}>
            {children}
        </SingletonHook2Context.Provider>
    )
}

export const SingletonHook3Provider: FC<SingletonHookProviderProps> = ({
    children,
    hooks = {},
}: SingletonHookProviderProps) => {
    const singletonHookRegistry = useSingletonHookRegistry(hooks)
    return (
        <SingletonHook3Context.Provider value={{ singletonHookRegistry }}>
            {children}
        </SingletonHook3Context.Provider>
    )
}