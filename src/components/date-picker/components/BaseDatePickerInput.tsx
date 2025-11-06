import { StyledInputField } from 'src/shared-components/StyledInputField'
import { DatePickerButton } from './DatePickerButton'
import { useDatePickerMask } from '../hooks/useDatePickerMask'
import { useEffect, useState } from 'react'
import { getValue } from '../helpers'
import { useDatePickerValidation } from '../hooks/useDatePickerValidation'
import { parse, isValid as isValidDateFns, type Locale } from 'date-fns'
import type { Matcher } from 'react-day-picker'
import { OutlineErrorRounded } from 'src/shared-components/OutlineErrorRounded'
import { cn } from 'src/helpers/cn'
import { HelperTextWithTooltip } from './HelperTextWithTooltip'

export type IBaseDatePickerInput = {
    dataTest: string
    label?: string
    inputClassName?: string
    disabled: boolean
    readOnly?: boolean
    helperText: React.ReactNode
    errorText: React.ReactNode
    onClick: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void
    selected: Date | undefined
    dateFormat?: string
    error?: boolean
    onInputChange?: (date?: Date) => void
    hideCalendar?: boolean
    locale?: Locale
    disabledDays?: Matcher | Matcher[]
    disallowPast?: boolean
    disallowFuture?: boolean
    validateOnCalendarClose?: boolean
    onValidatedOnce?: () => void
}

export const BaseDatePickerInput: React.FC<IBaseDatePickerInput> = (props) => {
    const {
        onClick,
        inputClassName,
        dateFormat,
        selected,
        error,
        helperText,
        errorText,
        onInputChange,
        hideCalendar,
        locale,
        disabledDays,
        label,
        readOnly,
        disallowPast,
        disallowFuture,
        validateOnCalendarClose,
        onValidatedOnce,
        ...rest
    } = props

    const { validationError, handleValidation, errHelperText } = useDatePickerValidation()
    const { maskRef } = useDatePickerMask()
    const [value, setValue] = useState(selected ? getValue(selected, dateFormat) : '')

    const defaultHelper = locale?.code?.startsWith('nb') ? 'DD/MM/ÅÅÅÅ' : 'DD/MM/YYYY'
    const hasError = !!(validationError || error)
    const rawText = hasError ? errorText || errHelperText : helperText ?? defaultHelper
    // const rawText = 'lognm text to activate tooltip to see how it will look '

    useEffect(() => {
        setValue(selected ? getValue(selected, dateFormat) : '')
    }, [selected])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (!validateOnCalendarClose) return
        handleValidation({
            value,
            disabledDays,
            localeCode: locale?.code,
            disallowPast,
            disallowFuture,
        })
        onValidatedOnce?.()
    }, [validateOnCalendarClose])

    const handleBlur = () => {
        const isErrorNow = handleValidation({
            value,
            disabledDays,
            localeCode: locale?.code,
            disallowPast,
            disallowFuture,
        })
        if (isErrorNow) return

        const onlyDigits = value.replace(/\D/g, '')
        if (!onlyDigits.length) {
            onInputChange?.(undefined)
            return
        }

        const parsed = parse(value, 'dd/MM/yyyy', new Date())
        onInputChange?.(isValidDateFns(parsed) ? parsed : undefined)
    }

    const width = readOnly ? 120 : 160
    const bottomSpace = 34
    const height = readOnly ? 40 : 75

    return (
        <div className='cursor-default'>
            {label && <div className='pb-1 font-semibold font-roboto text-delta-800'>{label}</div>}

            <div className='flex gap-1' style={{ height }}>
                <div style={{ width }}>
                    <div className='relative'>
                        <StyledInputField
                            {...rest}
                            readOnly={readOnly}
                            data-testid={rest.dataTest}
                            autoComplete='off'
                            inputRef={!readOnly ? maskRef : undefined}
                            placeholder={!readOnly ? '  /  /    ' : undefined}
                            size='small'
                            value={readOnly ? value.replaceAll('/', '.') : value}
                            className={inputClassName}
                            style={{ width }}
                            error={hasError}
                            onBlur={!readOnly ? handleBlur : undefined}
                            helperText={null}
                            FormHelperTextProps={{ sx: { m: 0 } }}
                            inputProps={{
                                ...(readOnly
                                    ? {}
                                    : {
                                          inputMode: 'numeric',
                                          style: { fontFamily: 'monospace' },
                                      }),
                            }}
                            onChange={onChange}
                        />
                        <div
                            className={cn(
                                'absolute w-6 h-6 right-2 top-2 flex items-center justify-center ',
                                'transform-gpu transition-all duration-300 ease-in-out',
                                hasError ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
                            )}
                        >
                            <OutlineErrorRounded width={20} height={20} color={'var(--colors-error-500)'} />
                        </div>
                    </div>
                    {!readOnly && (
                        <div
                            className={cn(
                                'pt-1 text-[12px]',
                                hasError ? 'text-[var(--colors-error-500)]' : 'text-delta-600',
                            )}
                            style={{
                                maxWidth: width,
                                maxHeight: bottomSpace,
                                lineHeight: '16px',
                                marginLeft: '16px',
                            }}
                        >
                            <HelperTextWithTooltip text={rawText} />
                        </div>
                    )}
                </div>

                {!hideCalendar && !readOnly && <DatePickerButton onClick={onClick} disabled={!!rest.disabled} />}
            </div>
        </div>
    )
}
