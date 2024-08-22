import React from 'react'
import type { Meta } from '@storybook/react'
import { RangePickerCompactExample } from './components/RangePickerCompactExample'
import { SinglePickerExample } from './components/SinglePickerExample'
import { NestedRangePickerExample } from './components/NestedRangePickerExample.1'
import { DatePickerContainer } from './components/DatePickerContainer'
import { RangePickerExample } from './components/RangePickerExample'
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
        </div>
    )
}
