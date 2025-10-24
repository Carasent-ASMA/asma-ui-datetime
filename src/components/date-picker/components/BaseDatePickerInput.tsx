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

export const BaseDatePickerInput: React.FC<IBaseDatePickerInput> = ({
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
    ...props
}) => {
    const { validationError, handleValidation, errHelperText } = useDatePickerValidation()
    const { maskRef } = useDatePickerMask()

    const [value, setValue] = useState(selected ? getValue(selected, dateFormat) : '')

    const defaultHelper = locale?.code?.startsWith('nb') ? 'DD/MM/ÅÅÅÅ' : 'DD/MM/YYYY'
    const hasError = !!(validationError || error)
    const text = hasError ? errorText || errHelperText : formatHelperText(helperText ?? defaultHelper)

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

    if (readOnly)
        return (
            <div>
                {label && <div className='pb-1 font-semibold font-roboto text-delta-800 cursor-default'>{label}</div>}

                <div className='flex gap-1'>
                    <div className='relative'>
                        <StyledInputField
                            {...props}
                            readOnly={readOnly}
                            data-testid={props.dataTest}
                            autoComplete='off'
                            size='small'
                            value={value.replaceAll('/', '.')}
                            className={inputClassName}
                            style={{ width: '120px' }}
                            error={hasError}
                            helperText={text}
                            FormHelperTextProps={{
                                sx: {
                                    '&.MuiFormHelperText-root': {
                                        position: 'absolute',
                                        bottom: '-24px',
                                        width: '450px',
                                    },
                                },
                            }}
                        />
                        <div
                            className={cn(
                                'absolute w-6 h-6 right-2 top-2 flex items-center justify-center',
                                'transform-gpu transition-all duration-300 ease-in-out',
                                hasError ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
                            )}
                        >
                            <OutlineErrorRounded width={20} height={20} color={'var(--colors-error-500)'} />
                        </div>
                    </div>
                </div>
            </div>
        )

    return (
        <div>
            {label && <div className='pb-1 font-semibold font-roboto text-delta-800 cursor-default'>{label}</div>}

            <div className='flex gap-1'>
                <div className='relative'>
                    <StyledInputField
                        {...props}
                        readOnly={readOnly}
                        data-testid={props.dataTest}
                        autoComplete='off'
                        inputRef={maskRef}
                        placeholder={'  /  /    '}
                        size='small'
                        value={value}
                        className={inputClassName}
                        style={{ width: '160px' }}
                        error={hasError}
                        helperText={text}
                        onBlur={handleBlur}
                        FormHelperTextProps={{
                            sx: {
                                '&.MuiFormHelperText-root': {
                                    position: 'absolute',
                                    bottom: '-24px',
                                    width: '450px',
                                },
                            },
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            style: {
                                fontFamily: 'monospace',
                            },
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
                {!hideCalendar && !readOnly && <DatePickerButton onClick={onClick} disabled={!!props.disabled} />}
            </div>
        </div>
    )
}
const formatHelperText = (text: React.ReactNode, maxChars = 75) => {
    if (typeof text !== 'string') return text
    return text.length > maxChars ? `${text.slice(0, maxChars)}…` : text
}
