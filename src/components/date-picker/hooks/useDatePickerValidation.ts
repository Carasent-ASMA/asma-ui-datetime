import { useState } from 'react'

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

    const handleValidation = (value: string): boolean => {
        const numbers = value.replace(/\D/g, '')

        if (!numbers.length) {
            setError(false)
            return false
        }

        if (numbers.length === 8 && isValidDate(value)) {
            setError(false)
            return false
        }

        setError(true)
        return true
    }

    return { validationError, handleValidation }
}
