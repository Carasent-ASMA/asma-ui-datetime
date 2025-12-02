import type PopupState from 'material-ui-popup-state'
import type { ReactNode } from 'react'

export type StyledTimePickerProps = {
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    inputClassName?: string
    value?: Date
    onSelect: (date: Date | undefined) => void
    dataTest: string
    width?: number
    error?: boolean
    helperText?: ReactNode
    label?: string
    locale?: 'no' | 'en'
    title?: string
}

export type IPopupStateType = ReturnType<typeof PopupState>
