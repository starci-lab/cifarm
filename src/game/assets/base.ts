//assets
export enum AssetName {
    Background = "background",
    Logo = "logo",
    LoadingBar = "loading-bar",
    LoadingFill = "loading-fill",
}

export const assetMap: Record<AssetName, string> = {
    [AssetName.Background]: "background.png",
    [AssetName.Logo]: "logo.png",
    [AssetName.LoadingBar]: "loading-bar.png",
    [AssetName.LoadingFill]: "loading-fill.png",
}