import type { IDatePickerRange } from '../types'
import clsx from 'clsx'
import styles from './DatePickerInputRangeCompact.module.scss'
import { BaseDatePickerInput } from './BaseDatePickerInput'
import { addDays } from 'date-fns'

export const DatePickerInputRangeCompact: React.FC<{
    datePickerProps: IDatePickerRange
    onClick: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
}> = ({ datePickerProps, onClick }) => {
    const {
        dataTest,
        className,
        inputClassName,
        disabled,
        readOnly,
        dateFormat,
        onInputChange,
        hideCalendar,
        locale,

        //
        labelFrom,
        errorFrom,
        helperTextFrom,
        errorTextFrom,
        //
        labelTo,
        errorTo,
        helperTextTo,
        errorTextTo,
        //
        selected,
        disabledDays,
    } = datePickerProps

    return (
        <div
            data-testid={dataTest}
            className={clsx(
                className,
                styles['styled-date-picker-input-range-compact'],
                disabled && styles['range-compact-disabled'],
            )}
        >
            {/* start value */}
            <BaseDatePickerInput
                dataTest='styled-date-picker-input-range-from'
                data-testid='styled-date-picker-input-range-from'
                dateFormat={dateFormat}
                selected={selected?.from}
                inputClassName={inputClassName}
                readOnly={readOnly}
                disabled={!!disabled}
                error={errorFrom}
                helperText={helperTextFrom}
                onClick={onClick}
                onInputChange={(date?: Date) => {
                    if (date && selected?.to && date.getTime() > selected?.to.getTime()) {
                        onInputChange?.({ from: date, to: addDays(date, 1) })
                    } else {
                        onInputChange?.({ from: date, to: selected?.to })
                    }
                }}
                hideCalendar={hideCalendar}
                locale={locale}
                disabledDays={disabledDays}
                label={labelFrom}
                errorText={errorTextFrom}
            />
            {/* end value */}
            <BaseDatePickerInput
                dataTest='styled-date-picker-input-range-to'
                data-testid='styled-date-picker-input-range-to'
                dateFormat={dateFormat}
                selected={selected?.to}
                inputClassName={inputClassName}
                disabled={!!disabled}
                readOnly={readOnly}
                error={errorTo}
                helperText={helperTextTo}
                onClick={onClick}
                onInputChange={(date?: Date) => {
                    if (date && selected?.from && date.getTime() < selected?.from.getTime()) {
                        onInputChange?.({ from: addDays(date, -1), to: date })
                    } else {
                        onInputChange?.({ from: selected?.from, to: date })
                    }
                }}
                hideCalendar={hideCalendar}
                locale={locale}
                label={labelTo}
                errorText={errorTextTo}
            />
        </div>
    )
}
