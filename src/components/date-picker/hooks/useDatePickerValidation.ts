import { parse, isValid as isValidDateFns } from 'date-fns'
import { useState } from 'react'
import type { Matcher } from 'react-day-picker'
import { isDisabledDate } from '../helpers'

const isValidDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number)

    if (!day || !month || !year) {
        return false
    }

    const date = new Date(year, month - 1, day)

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}

export const useDatePickerValidation = () => {
    const [validationError, setError] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [helperTxt, setHelperTxt] = useState('')

    const handleValidation = ({
        value,
        disabledDays,
        localeCode,
    }: {
        value: string
        disabledDays?: Matcher | Matcher[]
        localeCode?: string
    }): boolean => {
        const numbers = value.replace(/\D/g, '')

        if (!numbers.length) {
            setError(false)
            setHelperTxt('')
            return false
        }

        const isNb = localeCode === 'nb'

        if (numbers.length === 8 && isValidDate(value) && disabledDays) {
            const parsedDate = parse(value, 'dd/MM/yyyy', new Date())
            const parsedDateIsValid = isValidDateFns(parsedDate)

            if (parsedDateIsValid) {
                const disabledDaysValidationError = isDisabledDate({ parsedDate, disabledDays })
                setDisabled(disabledDaysValidationError)

                if (disabledDaysValidationError) {
                    setHelperTxt(isNb ? 'Dato er ugyldig' : 'Date is disabled')
                    setError(true)
                    return true
                } else {
                    setHelperTxt('')
                    setError(false)
                    return false
                }
            }
        }

        if (numbers.length === 8 && isValidDate(value)) {
            setError(false)
            setHelperTxt('')
            return false
        }

        setError(true)
        setHelperTxt(isNb ? 'Ugyldig datoformat' : 'Invalid date format')
        return true
    }

    return { validationError, handleValidation, setError, disabled, setDisabled, helperTxt, setHelperTxt }
}
