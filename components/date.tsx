import {format} from 'date-fns'

export default function DateComponent({timestamp}) {
  let date
  try {
    date = new Date(Number(timestamp))
  } catch (e) {
    return null
  }

  return <time dateTime={timestamp}>{format(date, 'LLLL d, yyyy')}</time>
}
