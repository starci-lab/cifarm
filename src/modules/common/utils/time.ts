import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
dayjs.extend(duration)

export const formatTime = (time: number) => {
    return dayjs.duration(time, "seconds").format("HH:mm:ss")
}