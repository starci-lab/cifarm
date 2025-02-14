export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createObjectId = (id: string): string => {
    let hex = Buffer.from(id, "utf-8").toString("hex")
    if (hex.length < 24) {
        hex = hex.padStart(24, "0")
    } else if (hex.length > 24) {
        hex = hex.slice(0, 24)
    }
    return hex
}