import { DayPicker, type CaptionProps, type DropdownProps, type ActiveModifiers } from 'react-day-picker'
import type { DatePickerProps } from '../types'
import { type PopoverProps } from '@mui/material'
import { useState } from 'react'
import { StyledCalendarPickerFooter } from './StyledCalendarPickerFooter'
import { CustomCaption } from './StyledCalendarPickerCaption'
import { StyledCalendarPickerSelectMonth } from './StyledCalendarPickerSelectMonth'
import { StyledCalendarPickerSelectYear } from './StyledCalendarPickerSelectYear'
import { enGB } from 'date-fns/locale'
import styles from './StyledCalendarPicker.module.scss'
import { startOfToday, endOfMonth } from 'date-fns'
import { toArray } from 'lodash-es'

export const StyledDayPicker: React.FC<{
    datePickerProps: DatePickerProps
    popoverProps: PopoverProps
}> = ({ datePickerProps, popoverProps }) => {
    const { showOutsideDays = true, locale = enGB, selected, numberOfMonths, disabledDays, onClear } = datePickerProps

    const { onClose } = popoverProps

    const startDate = datePickerProps.mode === 'range' ? datePickerProps.selected?.from : datePickerProps.selected

    const [month, setMonth] = useState<Date | undefined>(startDate || new Date(Date.now()))
    const isNb = locale.code === 'nb'
    const isOneMonthView = (numberOfMonths || 1) < 2

    const disallowPast = 'disallowPast' in datePickerProps ? datePickerProps.disallowPast : undefined
    const disallowFuture = 'disallowFuture' in datePickerProps ? datePickerProps.disallowFuture : undefined

    const today = startOfToday()
    const disabledMerged = [
        ...toArray(disabledDays),
        ...(disallowPast ? [{ before: today }] : []),
        ...(disallowFuture ? [{ after: today }] : []),
    ]

    const removeSelection = (e: React.MouseEvent) =>
        selected && datePickerProps?.onSelect?.(undefined, new Date(Date.now()), {}, e)

    const handleMonthChange = (nextMonth: Date) => {
        setMonth(nextMonth)

        if (!datePickerProps.onSelect) return

        if (!datePickerProps.mode || datePickerProps.mode === 'single') {
            const currentSelected = datePickerProps.selected

            if (currentSelected instanceof Date) {
                const year = nextMonth.getFullYear()
                const monthIndex = nextMonth.getMonth()
                const day = currentSelected.getDate()

                const lastDayOfTargetMonth = endOfMonth(new Date(year, monthIndex, 1)).getDate()
                const safeDay = Math.min(day, lastDayOfTargetMonth)

                const newSelectedDate = new Date(currentSelected)
                newSelectedDate.setFullYear(year, monthIndex, safeDay)

                datePickerProps.onSelect(
                    newSelectedDate,
                    newSelectedDate,
                    {} as ActiveModifiers,
                    {} as React.MouseEvent<Element, MouseEvent>,
                )
            }
        }
    }

    return (
        <DayPicker
            disabled={disabledMerged}
            month={month}
            onMonthChange={handleMonthChange}
            captionLayout='dropdown'
            weekStartsOn={1}
            locale={locale}
            fromYear={datePickerProps.fromYear || 1900}
            toYear={datePickerProps.toYear || 2100}
            data-test={'calendar-picker'}
            showWeekNumber
            showOutsideDays={showOutsideDays}
            fixedWeeks
            className={`${styles['styled-calendar-day-picker']} ${isNb ? styles['locale-nb'] : ''}`}
            classNames={{
                months: styles['months'],
                weeknumber: styles['weeknumber'],
                month: styles['month'],
                caption: styles['caption'],
                caption_label: styles['caption_label'],
                nav: styles['nav'],
                nav_button: styles['nav_button'],
                nav_button_previous: styles['nav_button_previous'],
                nav_button_next: styles['nav_button_next'],
                head_row: styles['head_row'],
                head_cell: styles['head_cell'],
                row: styles['row'],
                cell: styles['cell'],
                day: styles['day'],
                day_today: styles['day_today'],
                day_selected: styles['day_selected'],
                day_outside: styles['day_outside'],
                day_disabled: styles['day_disabled'],
                day_range_middle: styles['day_range_middle'],
                day_hidden: styles['day_hidden'],
                caption_end: isOneMonthView ? '' : styles['caption_end'],
            }}
            components={{
                Caption: (props: CaptionProps) => (
                    <CustomCaption {...props} setMonth={setMonth} month={month} isNb={isNb} onClose={onClose} />
                ),
                Dropdown: (props: DropdownProps) => {
                    return props.name === 'months' ? (
                        <StyledCalendarPickerSelectMonth {...props} />
                    ) : (
                        <StyledCalendarPickerSelectYear {...props} />
                    )
                },
            }}
            footer={
                <StyledCalendarPickerFooter
                    onClose={onClose}
                    isNb={isNb}
                    selected={selected}
                    removeSelection={removeSelection}
                    setMonth={setMonth}
                    month={month}
                    onClear={onClear}
                />
            }
            {...datePickerProps}
        />
    )
}
