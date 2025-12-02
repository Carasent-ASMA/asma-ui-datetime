import { parse, isValid as isValidDateFns, startOfDay } from 'date-fns'
import { useState } from 'react'
import type { Matcher } from 'react-day-picker'
import { buildDisabled, isDisabledDate } from '../helpers'

const msgs = {
    en: {
        invalidDay: 'Invalid day',
        invalidMonth: 'Invalid month',
        invalidYear: 'Invalid year. Year must be between 1900-2100',
        invalidDate: 'Invalid date',
        invalidFormat: 'Invalid date. Use format DD.MM.YYYY',
        dateDisabled: 'Date is disabled',
        pastNotAllowed: 'Past date is not allowed',
        futureNotAllowed: 'Future date is not allowed',
    },
    nb: {
        invalidDay: 'Ugyldig dag',
        invalidMonth: 'Ugyldig måned',
        invalidYear: 'Ugyldig år. År må være mellom 1900 og 2100',
        invalidDate: 'Ugyldig dato',
        invalidFormat: 'Ugyldig dato. Bruk formatet DD.MM.ÅÅÅÅ',
        dateDisabled: 'Dato er ugyldig',
        pastNotAllowed: 'Dato i fortiden er ikke tillatt',
        futureNotAllowed: 'Dato i fremtiden er ikke tillatt',
    },
} as const

const formatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
export const useDatePickerValidation = () => {
    const [validationError, setError] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [errHelperText, setErrHelperText] = useState('')

    const handleValidation = ({
        value,
        disabledDays,
        localeCode,
        disallowPast,
        disallowFuture,
    }: {
        value: string
        disabledDays?: Matcher | Matcher[]
        localeCode?: string
        disallowPast?: boolean
        disallowFuture?: boolean
    }): boolean => {
        const lang = localeCode === 'nb' ? 'nb' : 'en'
        const digits = value.replace(/\D/g, '')

        // empty => no error
        if (!digits.length) {
            setError(false)
            setErrHelperText('')
            setDisabled(false)
            return false
        }

        //1. check for format DD/MM/YYYY
        const m = value.match(formatRegex)
        if (!m) {
            setError(true)
            setErrHelperText(msgs[lang].invalidFormat)
            setDisabled(false)
            return true
        }

        const dd = Number(m[1])
        const mm = Number(m[2])
        const yyyy = Number(m[3])

        // 1) DAY invalid => "Invalid day"
        if (dd < 1 || dd > 31) {
            setError(true)
            setErrHelperText(msgs[lang].invalidDay)
            setDisabled(false)
            return true
        }

        // - month invalid -> Invalid month
        if (mm < 1 || mm > 12) {
            setError(true)
            setErrHelperText(msgs[lang].invalidMonth)
            setDisabled(false)
            return true
        }

        // - year invalid => Invalid year
        if (yyyy < 1900 || yyyy > 2100) {
            setError(true)
            setErrHelperText(msgs[lang].invalidYear)
            setDisabled(false)
            return true
        }

        // 4) full date validity (e.g., 31/04/2025)
        const d = new Date(yyyy, mm - 1, dd)
        const calendarOk = d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd
        if (!calendarOk) {
            setError(true)
            setErrHelperText(msgs[lang].invalidDate)
            setDisabled(false)
            return true
        }

        const canonical = `${m[1]}/${m[2]}/${m[3]}`
        const parsed = parse(canonical, 'dd/MM/yyyy', new Date())
        if (!isValidDateFns(parsed)) {
            setError(true)
            setErrHelperText(msgs[lang].invalidDate)
            setDisabled(false)
            return true
        }

        // 5) check disabled date 
        const mergedDisabled = buildDisabled(disabledDays, disallowPast, disallowFuture)
        if (mergedDisabled.length) {
            const policyHit = isDisabledDate({ parsedDate: parsed, disabledDays: mergedDisabled })
            setDisabled(policyHit)
            if (policyHit) {
                setErrHelperText(msgs[lang].dateDisabled)
                setError(true)
                return true
            }
        }

        setError(false)
        setErrHelperText('')
        setDisabled(false)
        return false
    }
    return { validationError, handleValidation, setError, disabled, setDisabled, errHelperText, setErrHelperText }
}
