import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import { StyledDatePicker } from 'src/components/date-picker'
import { StyledTimePicker } from 'src/components/time-picker'

const meta = {
    title: '*/DateTimeComponents',
    component: StyledDatePicker,
    tags: [],
    argTypes: {},
    args: {},
} satisfies Meta<typeof StyledDatePicker>

export default meta

export const DateTimeComponents = () => {
    const [dateVal, setDateVal] = useState<Date>()
    const [timeVal, setTimeVal] = useState<Date>()

    return (
        <div className='flex gap-5'>
            <StyledDatePicker
                mode='single'
                label='Label'
                selected={new Date()}
                dataTest='example'
                helperText='helper text'
            />
            <StyledTimePicker
                label='Label'
                value={new Date()}
                dataTest='example'
                onSelect={() => undefined}
                helperText='helper text'
            />

            <StyledDatePicker
                mode='single'
                label='Label'
                selected={dateVal}
                onSelect={(date) => setDateVal(date)}
                dataTest='example'
                error={!dateVal}
                errorText={!dateVal && 'Required'}
                helperText='helper text'
            />
            <StyledTimePicker
                label='Label'
                value={timeVal}
                dataTest='example'
                onSelect={(date) => setTimeVal(date)}
                error={!timeVal}
                helperText={!timeVal && 'Required'}
            />
        </div>
    )
}
