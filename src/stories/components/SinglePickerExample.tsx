import { useState } from 'react'
import { StyledDatePicker } from 'src/components/date-picker'

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
                label='Label'
                // disabledDays={{ before: new Date(Date.now()) }}
                dateFormat='dd.MM.yyyy'
            />
        </div>
    )
}
