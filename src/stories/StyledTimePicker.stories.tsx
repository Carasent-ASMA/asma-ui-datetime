import type { Meta } from '@storybook/react'
import { add } from 'date-fns'
import { useState } from 'react'
import { StyledTimePicker } from 'src/components/time-picker'

const meta = {
    title: '*/TimePicker',
    component: StyledTimePicker,
    tags: [],
} satisfies Meta<typeof StyledTimePicker>

export default meta

export const TimePicker = () => {
    const [value, setValue] = useState<Date | undefined>()
    const [value2, setValue2] = useState<Date | undefined>()

    return (
        <div className='flex-col' style={{ display: 'flex', width: '100%', gap: '20px' }}>
            <div className='w-fit gap-7 flex'>
                <StyledTimePicker dataTest='test' value={value} onSelect={setValue} label='Time' placeholder='Time' />
                <StyledTimePicker
                    dataTest='test'
                    value={value}
                    onSelect={setValue}
                    error
                    helperText='Some error'
                    label='Time'
                    placeholder='Time'
                    locale={'no'}
                />
                <StyledTimePicker
                    dataTest='test'
                    value={value}
                    onSelect={setValue}
                    disabled
                    label='Time'
                    placeholder='Time'
                />
                <StyledTimePicker
                    dataTest='test'
                    value={value}
                    onSelect={setValue}
                    readOnly
                    label='Time'
                    placeholder='Time'
                />
            </div>
            <div>
                <div className='pb-2'>Range</div>
                <div className='flex gap-5'>
                    <StyledTimePicker
                        dataTest='test'
                        value={value}
                        onSelect={(date) => {
                            setValue(date)
                            date && setValue2(add(date, { minutes: 30 }))
                        }}
                        label='Time'
                        placeholder='Time'
                        locale={'no'}
                    />
                    <StyledTimePicker
                        dataTest='test'
                        value={value2}
                        onSelect={setValue2}
                        label='Time'
                        placeholder='Time'
                    />
                </div>
            </div>
        </div>
    )
}
