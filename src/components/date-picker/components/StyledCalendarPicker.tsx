import { DayPicker, type CaptionProps, type DropdownProps } from 'react-day-picker'
import type { DatePickerProps } from '../types'
import { Popover, type PopoverProps } from '@mui/material'
import { useState } from 'react'
import { StyledCalendarPickerFooter } from './StyledCalendarPickerFooter'
import { CustomCaption } from './StyledCalendarPickerCaption'
import { StyledCalendarPickerSelectMonth } from './StyledCalendarPickerSelectMonth'
import { StyledCalendarPickerSelectYear } from './StyledCalendarPickerSelectYear'
import { enGB } from 'date-fns/locale'
import styles from './StyledCalendarPicker.module.scss'

export const StyledCalendarPicker: React.FC<{
    datePickerProps: DatePickerProps
    popoverProps: PopoverProps
    positionAbove: boolean
}> = ({ datePickerProps, popoverProps, positionAbove }) => {
    const { showOutsideDays = true, locale, selected, numberOfMonths, disabledDays, onClear } = datePickerProps
    const { open, anchorEl, onClose } = popoverProps
    const [month, setMonth] = useState<Date | undefined>(new Date(Date.now()))
    const isNb = locale?.code === 'nb'
    const isOneMonthView = (numberOfMonths || 1) < 2

    const removeSelection = (e: React.MouseEvent) =>
        selected && datePickerProps?.onSelect?.(undefined, new Date(Date.now()), {}, e)

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: positionAbove ? 'top' : 50,
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: positionAbove ? 'bottom' : 'top',
                horizontal: 'left',
            }}
        >
            <div className='p-4'>
                <DayPicker
                    disabled={disabledDays}
                    month={month}
                    onMonthChange={(e) => {
                        setMonth(e)
                    }}
                    captionLayout='dropdown'
                    locale={locale ? locale : enGB}
                    fromYear={datePickerProps.fromYear || 1900}
                    toYear={datePickerProps.toYear || 2100}
                    data-test={'calendar-picker'}
                    showWeekNumber
                    showOutsideDays={showOutsideDays}
                    fixedWeeks
                    className={styles['styled-calendar-day-picker']}
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
                            <CustomCaption {...props} setMonth={setMonth} month={month} isNb={isNb} />
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
            </div>
        </Popover>
    )
}
