import { addDays } from 'date-fns'
import { useState } from 'react'
import { StyledDatePicker } from 'src/components/date-picker'
import { setMidnightTime, setZeroTime } from 'src/helpers'

export const SinglePickerExample: React.FC = () => {
    const [date, setDate] = useState<Date>()

    return (
        <div className='pt-4'>
            <StyledDatePicker
                dataTest='StyledDatePicker'
                // locale={enGB}
                mode='single'
                selected={date}
                onSelect={(e) => {
                    setDate(e)
                }}
                onInputChange={(date: Date | undefined) => setDate(date)}
                placeholder='Placeholder'
                label='Test Label '
                disabledDays={{
                    before: setZeroTime(addDays(new Date(Date.now()), 2)),
                    after: setMidnightTime(addDays(new Date(Date.now()), 4)),
                }}
                dateFormat='dd.MM.yyyy'
            />
        </div>
    )
}
