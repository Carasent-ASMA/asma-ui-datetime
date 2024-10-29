import { format } from 'date-fns'
import type { Dispatch, SetStateAction } from 'react'

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
