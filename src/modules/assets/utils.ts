//import { envConfig } from "@/env"
import urlJoin from "url-join"

const PRODUCTION_BASE_URL = "https://cifarm.sgp1.cdn.digitaloceanspaces.com/assets"

export const getAssetUrl = (assetKey: string) => {
    return urlJoin(PRODUCTION_BASE_URL, assetKey)
}

