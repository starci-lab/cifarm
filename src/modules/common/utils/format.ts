import numeral from "numeral"
import dayjs from "dayjs"

export const NUMBER_PATTERN_1 = "0.0000a"

export enum NumberPattern {
  First = NUMBER_PATTERN_1,
}

export const formatNumber = (
    value: number,
    pattern: NumberPattern = NumberPattern.First
) => {
    return numeral(value).format(pattern)
} 

export const DAY_PATTERN_1 = "HH:mm:ss DD/MM/YYYY"

export enum DayPattern {
  First = DAY_PATTERN_1,
}

export const formatDay = (
    value?: string | Date,
    pattern: DayPattern = DayPattern.First
) => dayjs(value).format(pattern)

export const truncateString = (
    address: string,
    start: number = 6,
    end: number = 4
) => {
    if (address.length < start + end) {
        return address
    }
    if (end === 0) return `${address.slice(0, start)}...`
    return `${address.slice(0, start)}...${address.slice(-end)}`
}

export const replace = (
    str: string,
    search: string,
    replace: string
): string => {
    return str.split(search).join(replace)
}

export type WithKey<T> = T & { key: string }

export const valuesWithKey = <T extends object>(
    object: Record<string, T>
): Array<WithKey<T>> => {
    return Object.entries(object).map(([key, value]) => ({ ...value, key }))
}

export const toMB = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2)
}