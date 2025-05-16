//import { envConfig } from "@/env"

const BASE_URL = "https://cifarm.sgp1.cdn.digitaloceanspaces.com/assets"
//const LOCAL_BASE_URL = "http://localhost:3000"

export const getAssetUrl = (assetKey: string) => {
    return `${BASE_URL}/${assetKey}`
}

