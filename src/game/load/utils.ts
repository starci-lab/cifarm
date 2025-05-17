//import { envConfig } from "@/env"
import { envConfig } from "@/env"
import urlJoin from "url-join"

const PRODUCTION_BASE_URL = "https://cifarm.sgp1.cdn.digitaloceanspaces.com/assets"
const LOCAL_BASE_URL = "http://localhost:3000"

export const getAssetUrl = (assetKey: string) => {
    return urlJoin(!envConfig().isLocal ? PRODUCTION_BASE_URL : LOCAL_BASE_URL, assetKey)
}

