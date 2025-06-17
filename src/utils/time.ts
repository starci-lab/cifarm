import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc)

export const formatTime = (time: number): string => {
    if (time < 0) return "00:00"
      
    const secondsInHour = 3600
    const secondsInDay = 86400
    const secondsInMonth = 30 * secondsInDay
      
    const dur = dayjs.duration(time, "seconds")
      
    if (time < secondsInHour) {
        // less than 1 hour: mm:ss
        return dur.format("m[m] s[s]")
    } else if (time < secondsInDay) {
        return dur.format("H[h] m[m] s[s]")
    } else if (time < secondsInMonth) {
        // less than 1 month: D days HH:mm:ss
        return dur.format("D[d] H[h] m[m] s[s]")
    } else {
        // 1 month or more: just show days
        const days = Math.floor(time / secondsInDay)
        return `${days}d`
    }
}

export const isoUtcDateToLocale = (isoDateString: dayjs.ConfigType): dayjs.Dayjs => {
    return dayjs.utc(isoDateString).local()
}

export const getCurrentDayMidnightUtc = (timeZoneOffset: number = 7): dayjs.Dayjs => {
    return dayjs().utcOffset(timeZoneOffset).startOf("day")
}

export const getNextDayMidnightUtc = (timeZoneOffset: number = 7): dayjs.Dayjs => {
    return dayjs().utcOffset(timeZoneOffset).add(1, "day").startOf("day")
}

export const getUtc = (time: dayjs.ConfigType, timeZoneOffset: number = 7): dayjs.Dayjs => {
    return dayjs.utc(time).utcOffset(timeZoneOffset)
}

// get now in utc
export const getNowUtc = (): dayjs.Dayjs => {
    return dayjs.utc()
}

export const getNextMinuteCronExecution = (minutes: Array<number> = [0, 15, 30, 45], timeZoneOffset: number = 7): number => {
    const now = dayjs().utcOffset(timeZoneOffset) // Get current time in UTC+7

    let nextCronTime = null

    // Find the next cron execution time based on current time
    for (const minute of minutes) {
        // Get the next occurrence of that minute in the current or next hour
        let potentialTime = now.clone().minute(minute).second(0) // Set to the current hour with the minute from cron expression
        if (potentialTime.isBefore(now)) {
            // If the calculated time is before now, use the next hour
            potentialTime = potentialTime.add(1, "hour")
        }
        
        // If it's the first valid time or earlier than the previous, set it as the next execution time
        if (!nextCronTime || potentialTime.isBefore(nextCronTime)) {
            nextCronTime = potentialTime
        }
    }

    // Calculate the time difference in milliseconds
    if (!nextCronTime) {
        return 0 // In case there are no valid cron times (this shouldn't happen with the provided minutes)
    }

    return nextCronTime.diff(now, "second")
}

export const getMaxEnergy = (level: number = 1): number => {
    return 50 + (level - 1) * 3
}

export const formatDistanceToNow = (date: Date): string => {
    return dayjs(date).fromNow()
}

