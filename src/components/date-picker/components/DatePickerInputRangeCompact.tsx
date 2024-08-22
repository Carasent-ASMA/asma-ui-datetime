import { getValue } from '../helpers'
import type { DatePickerProps } from '../types'
import clsx from 'clsx'
import styles from './DatePickerInputRangeCompact.module.scss'
import { StyledInputField } from 'src/shared-components/StyledInputField'
import { OutlineCalendarMonth } from 'src/shared-components/OutlineCalendarMonth'

export const DatePickerInputRangeCompact: React.FC<
    DatePickerProps & { onClick: (e: React.MouseEvent<HTMLDivElement>) => void }
> = (props) => {
    const {
        dataTest,
        className,
        inputClassName,
        disabled,
        placeholderFrom,
        placeholderTo,
        dateFormat,
        onClick,
        labelFrom,
        labelTo,
    } = props

    if (props.mode !== 'range') return null
    const value_from: string | undefined = getValue(props.selected?.from, dateFormat)
    const value_to: string | undefined = getValue(props.selected?.to, dateFormat)

    return (
        <div
            data-test={dataTest}
            className={clsx(
                className,
                styles['styled-date-picker-input-range-compact'],
                disabled && styles['range-compact-disabled'],
            )}
            onClick={(e) => !disabled && onClick(e)}
        >
            <StyledInputField
                label={labelFrom}
                autoComplete='off'
                size='small'
                dataTest='styled-date-picker-input-range-from'
                placeholder={placeholderFrom}
                value={value_from}
                disabled={!!disabled}
                className={inputClassName}
                style={{ width: '144px' }}
                InputProps={{
                    endAdornment: <OutlineCalendarMonth width={24} height={24} />,
                }}
                FormHelperTextProps={{
                    sx: { '&.Mui-error': { position: 'absolute', bottom: '-24px' } },
                }}
            />
            <StyledInputField
                label={labelTo}
                autoComplete='off'
                dataTest='styled-date-picker-input-range-to'
                size='small'
                placeholder={placeholderTo}
                value={value_to}
                disabled={!!disabled}
                className={inputClassName}
                style={{ width: '144px' }}
                InputProps={{
                    endAdornment: <OutlineCalendarMonth width={24} height={24} />,
                }}
                FormHelperTextProps={{
                    sx: { '&.Mui-error': { position: 'absolute', bottom: '-24px' } },
                }}
            />
        </div>
    )
}
