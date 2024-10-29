import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { nb } from 'date-fns/locale'
import { StyledDatePicker } from 'src/components/date-picker'
import { setMidnightTime, setZeroTime } from 'src/helpers/date.helper'

export const RangePickerExample: React.FC = () => {
    const [rangeCompact, setRangeCompact] = useState<DateRange>()

    return (
        <div className='pt-4'>
            <StyledDatePicker
                mode='range'
                dataTest='range-picker-example'
                locale={nb}
                placeholderFrom='Fra'
                placeholderTo='Til'
                labelFrom='Fra'
                labelTo='Til'
                selected={rangeCompact}
                onSelect={(data) => {
                    const selected = {
                        from: data?.from ? setZeroTime(data.from) : undefined,
                        to: data?.to ? setMidnightTime(data.to) : undefined,
                    }
                    setRangeCompact(selected)
                }}
                onInputChange={(data) => {
                    const selected = {
                        from: data?.from ? setZeroTime(data.from) : undefined,
                        to: data?.to ? setMidnightTime(data.to) : undefined,
                    }
                    setRangeCompact(selected)
                }}
                dateFormat={'dd.MM.yyyy'}
                helperTextFrom='* Påkrevd'
                // hideCalendar
            />
        </div>
    )
}
