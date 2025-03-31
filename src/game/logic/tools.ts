import { ToolSchema } from "@/modules/entities"
import { Scene } from "phaser"
import { CacheKey } from "../types"

export const getDefaultTools = ({ scene, tools }: GetDefaultToolsParams) => {
    // if tools is not provided, get from cache
    if (!tools) {
        // get the tools from cache
        tools = scene.cache.obj.get(CacheKey.Tools) as Array<ToolSchema>
    }

    return tools.filter((tool) => tool.default)
}

export interface GetDefaultToolsParams {
    // scene to display the modal
    scene: Scene;
    // the tools to check, if not specified, will try to get from cache
    tools?: Array<ToolSchema>;
}