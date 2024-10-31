import { format, isAfter, isBefore } from 'date-fns'
import type { Dispatch, SetStateAction } from 'react'
import type { Matcher } from 'react-day-picker'

export const getValue = (date?: Date, _dateFormat = 'dd/MM/yyyy') => {
    return date ? format(date, 'dd/MM/yyyy') : ''
}

export const setPickerPosition = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
    setPositionAbove: Dispatch<SetStateAction<boolean>>,
): void => {
    const windowHeight = window.innerHeight
    const inputRect = e.currentTarget.getBoundingClientRect()
    const spaceAbove = inputRect.top
    const spaceBelow = windowHeight - inputRect.bottom

    if (spaceBelow < 300 && spaceAbove > spaceBelow) {
        setPositionAbove(true)
    } else {
        setPositionAbove(false)
    }
}

export const isDisabledDate = ({
    parsedDate,
    disabledDays,
}: {
    parsedDate?: Date
    disabledDays?: Matcher | Matcher[]
}): boolean => {
    if (!parsedDate || !(typeof disabledDays === 'object')) return false

    let isDisabled = false
    if (
        ('before' in disabledDays && isBefore(parsedDate, disabledDays.before)) ||
        ('after' in disabledDays && isAfter(parsedDate, disabledDays.after))
    ) {
        isDisabled = true
    }

    return isDisabled
}
