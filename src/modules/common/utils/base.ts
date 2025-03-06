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

export const computeExperiencesQuota = (level: number): number => {
    //the formula to calculate the experience quota
    //compute first 10 levels
    // 1: 50
    // 2: 125
    // 3: 225
    // 4: 350
    // 5: 500
    // 6: 675
    // 7: 875
    // 8: 1100
    // 9: 1350
    // 10: 1625
    return 50 * level + 25 * Math.pow(level - 1, 2)
}
