import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import 'dayjs/locale/ko'

export const fromNow = (time: string | Date) => {
  return dayjs(time).fromNow()
}
export const formatTime = (
  time: string | Date,
  format = 'YYYY.MM.DD h:mm A'
) => {
  return dayjs(time).format(format)
}
