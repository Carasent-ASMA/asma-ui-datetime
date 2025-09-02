import type { IDatePickerSingle } from '../types'
import { BaseDatePickerInput } from './BaseDatePickerInput'

export const DatePickerInputSingle: React.FC<{
    datePickerProps: IDatePickerSingle
    onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void
}> = ({ datePickerProps, onClick }) => {
    const {
        inputClassName,
        disabled,
        helperText,
        label,
        onInputChange,
        selected,
        error,
        locale,
        hideCalendar,
        dateFormat,
        disabledDays,
        dataTest,
        errorText,
    } = datePickerProps

    return (
        <BaseDatePickerInput
            dataTest={dataTest}
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
            label={label}
            errorText={errorText}
        />
    )
}
