import { StyledInputField } from 'src/shared-components/StyledInputField'
import { DatePickerButton } from './DatePickerButton'
import { useDatePickerMask } from '../hooks/useDatePickerMask'
import { useEffect, useState } from 'react'
import { getValue } from '../helpers'
import { useDatePickerValidation } from '../hooks/useDatePickerValidation'
import { parse, isValid as isValidDateFns, type Locale } from 'date-fns'

export type IBaseDatePickerInput = {
    dataTest: string
    label?: string
    inputClassName?: string
    disabled: boolean
    helperText: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
    selected: Date | undefined
    dateFormat?: string
    error?: boolean
    onInputChange?: (date?: Date) => void
    hideCalendar?: boolean
    locale?: Locale
}

export const BaseDatePickerInput: React.FC<IBaseDatePickerInput> = ({
    onClick,
    inputClassName,
    dateFormat,
    selected,
    error,
    helperText,
    onInputChange,
    hideCalendar,
    locale,
    ...props
}) => {
    const { validationError, handleValidation } = useDatePickerValidation()
    const { maskRef } = useDatePickerMask()

    const [value, setValue] = useState(selected ? getValue(selected, dateFormat) : '')

    useEffect(() => {
        setValue(selected ? getValue(selected, dateFormat) : '')
    }, [dateFormat, selected])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        const numbers = newValue.replace(/\D/g, '')

        handleValidation(newValue)
        setValue(newValue)
        const buildingDate = parse(newValue, 'dd/MM/yyyy', new Date())
        const isValid = isValidDateFns(buildingDate)
        const parsedDate = isValid ? buildingDate : undefined

        if (parsedDate || (!parsedDate && !numbers.length)) {
            onInputChange?.(parsedDate)
        }
    }

    let helperTxt = helperText
    if (validationError) {
        const isNb = locale?.code === 'nb'
        helperTxt = isNb ? 'Ugyldig datoformat' : 'Invalid date format'
    } else if (error) {
        helperTxt = error
    }

    return (
        <div className='flex gap-1'>
            <StyledInputField
                {...props}
                autoComplete='off'
                inputRef={maskRef}
                placeholder={'__/__/____'}
                size='small'
                value={value}
                className={inputClassName}
                style={{ width: '140px' }}
                error={validationError || error}
                helperText={helperTxt}
                FormHelperTextProps={{
                    sx: { '&.MuiFormHelperText-root': { position: 'absolute', bottom: '-24px' } },
                }}
                inputProps={{
                    style: {
                        fontFamily: 'monospace',
                    },
                }}
                onChange={handleInputChange}
                onBlur={() => {
                    if (selected) {
                        setValue(getValue(selected, dateFormat))
                        handleValidation(getValue(selected, dateFormat))
                    }
                }}
            />

            {!hideCalendar && <DatePickerButton onClick={onClick} disabled={!!props.disabled} />}
        </div>
    )
}
