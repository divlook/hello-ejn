import { zerofill } from '@/libs/utils'

export const parseDate = (input: string | number | Date) => {
    const date = new Date(input)

    if (!date.valueOf()) {
        return null
    }

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return {
        year,
        month,
        day,
        hour,
        minute,
    }
}

export const dateFormat = (input: string | number | Date) => {
    const date = parseDate(input)
    const z = zerofill

    if (!date) return ''

    const { year, month, day, hour, minute } = date

    return `${year}.${z(month)}.${z(day)} ${z(hour)}:${z(minute)}`
}

export const date2ISOString = (input: string | number | Date) => {
    const date = parseDate(input)
    const z = zerofill

    if (!date) return ''

    const { year, month, day, hour, minute } = date

    return `${year}-${z(month)}-${z(day)}T${z(hour)}:${z(minute)}`
}
