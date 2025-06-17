export const computeRaw = (amount: number, decimals = 8): bigint => {
    const mutiplier = 10 ** decimals
    return BigInt(amount * mutiplier)
}
