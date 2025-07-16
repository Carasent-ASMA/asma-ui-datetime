import type { IDatePickerSingle } from '../types'
import { BaseDatePickerInput } from './BaseDatePickerInput'

export const DatePickerInputSingle: React.FC<{
    datePickerProps: IDatePickerSingle
    onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
}> = ({ datePickerProps, onClick }) => {
    const {
        label,
        inputClassName,
        disabled,
        helperText,
        onInputChange,
        selected,
        error,
        locale,
        hideCalendar,
        dateFormat,
        disabledDays,
        dataTest,
    } = datePickerProps

    return (
        <BaseDatePickerInput
            dataTest={dataTest}
            label={label}
            inputClassName={inputClassName}
            disabled={!!disabled}
            helperText={helperText}
            onClick={onClick}
            onInputChange={(date?: Date) => onInputChange?.(date)}
            selected={selected}
            error={!!error}
            locale={locale}
            hideCalendar={hideCalendar}
            dateFormat={dateFormat}
            disabledDays={disabledDays}
        />
    )
}
