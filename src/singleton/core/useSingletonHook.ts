/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from "react"
import { SingletonHook2Context, SingletonHook3Context, SingletonHookContext } from "./Provider"

export type HookReturnType = any;
export type HookReturnMap = Record<string, HookReturnType>;
export type HookFn<HRT extends HookReturnType = any> = (
  ...params: Array<any>
) => HRT;

export const useSingletonHookRegistry = (
    hooks: Record<string, HookReturnType> = {}
) => hooks

export const useSingletonHook = <HRT extends HookReturnType>(
    name: string
): HRT => {
    const { singletonHookRegistry } = use(SingletonHookContext)!
    return singletonHookRegistry[name]
}

export const useSingletonHook2 = <HRT extends HookReturnType>(
    name: string
): HRT => {
    const { singletonHookRegistry } = use(SingletonHook2Context)!
    return singletonHookRegistry[name]
}

export const useSingletonHook3 = <HRT extends HookReturnType>(
    name: string
): HRT => {
    const { singletonHookRegistry } = use(SingletonHook3Context)!
    return singletonHookRegistry[name]
}

