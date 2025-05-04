const BASE_URL = "https://cifarm.sgp1.cdn.digitaloceanspaces.com/assets"

export const getAssetUrl = (assetKey: string) => {
    return `${BASE_URL}/${assetKey}`
}

