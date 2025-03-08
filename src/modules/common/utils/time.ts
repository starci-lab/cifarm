import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import utc from "dayjs/plugin/utc"
dayjs.extend(duration)
dayjs.extend(utc)

export const formatTime = (time: number) => {
    if (time < 0) {
        return "00:00:00"
    }
    return dayjs.duration(time, "seconds").format("HH:mm:ss")
}

export const isoUtcDateToLocale = (isoDateString: dayjs.ConfigType): dayjs.Dayjs => {
    return dayjs.utc(isoDateString).local()
}