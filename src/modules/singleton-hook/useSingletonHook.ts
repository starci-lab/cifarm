/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from "react"
import { SingletonHookContext } from "./Provider"

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
