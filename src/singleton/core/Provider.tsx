"use client"
import React, { createContext, FC, PropsWithChildren } from "react"
import { HookReturnMap } from "./useSingletonHook"

interface SingletonHookValue {
  singletonHookRegistry: HookReturnMap;
}

export const BaseSingletonHookContext =
  createContext<SingletonHookValue | null>(null)

export const BaseSingletonHook2Context =
  createContext<SingletonHookValue | null>(null)

export const BaseSingletonHook3Context =
  createContext<SingletonHookValue | null>(null)

export interface SingletonHookProviderProps extends PropsWithChildren {
  hooks?: HookReturnMap;
}

export const BaseSingletonHookProvider: FC<SingletonHookProviderProps> = ({
    children,
    hooks = {},
}: SingletonHookProviderProps) => {
    return (
        <BaseSingletonHookContext.Provider value={{ singletonHookRegistry: hooks }}>
            {children}
        </BaseSingletonHookContext.Provider>
    )
}

export const BaseSingletonHook2Provider: FC<SingletonHookProviderProps> = ({
    children,
    hooks = {},
}: SingletonHookProviderProps) => {
    return (
        <BaseSingletonHook2Context.Provider
            value={{ singletonHookRegistry: hooks }}
        >
            {children}
        </BaseSingletonHook2Context.Provider>
    )
}

export const BaseSingletonHook3Provider: FC<SingletonHookProviderProps> = ({
    children,
    hooks = {},
}: SingletonHookProviderProps) => {
    return (
        <BaseSingletonHook3Context.Provider
            value={{ singletonHookRegistry: hooks }}
        >
            {children}
        </BaseSingletonHook3Context.Provider>
    )
}
