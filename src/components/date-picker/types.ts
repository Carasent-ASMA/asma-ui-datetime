import type { DayPicker, Matcher } from 'react-day-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

type CommonDatePickerProps = {
    dateFormat?: string
    className?: string
    inputClassName?: string
    disabledDays?: Matcher | Matcher[]
    dataTest: string
    hideCalendar?: boolean
    onClear?: () => void
} & CalendarProps

type DefaultSingleProps = {
    mode: 'single'
    compact?: never
    //
    placeholder?: string
    placeholderFrom?: never
    placeholderTo?: never
    //
    label: string
    labelFrom?: never
    labelTo?: never
    helperText?: React.ReactNode
    error?: boolean
    errorText?: React.ReactNode
    allowClear?: boolean
    onInputChange?: (date: Date | undefined) => void
}

type CompactRangeProps = {
    mode: 'range'
    //
    placeholder?: never
    placeholderFrom?: string
    placeholderTo?: string
    //
    label?: string
    labelFrom: string
    labelTo: string
    helperTextFrom?: React.ReactNode
    helperTextTo?: React.ReactNode
    errorFrom?: boolean
    errorTo?: boolean
    errorTextFrom?: React.ReactNode
    errorTextTo?: React.ReactNode
    onInputChange?: ({ from, to }: { from: Date | undefined; to: Date | undefined }) => void
}

export type DatePickerProps = CommonDatePickerProps & (CompactRangeProps | DefaultSingleProps)

export type IDatePickerRange = CommonDatePickerProps & CompactRangeProps

export type IDatePickerSingle = CommonDatePickerProps & DefaultSingleProps
