import React from 'react'
import type { Meta } from '@storybook/react'
import { RangePickerCompactExample } from './components/RangePickerCompactExample'
import { SinglePickerExample } from './components/SinglePickerExample'
import { NestedRangePickerExample } from './components/NestedRangePickerExample.1'
import { DatePickerContainer } from './components/DatePickerContainer'
import { RangePickerExample } from './components/RangePickerExample'
import { StyledDatePicker } from 'src/components/date-picker'

const meta = {
    title: '*/DatePicker',
    component: StyledDatePicker,
    tags: [],
    argTypes: {},
    args: {},
} satisfies Meta<typeof StyledDatePicker>

export default meta

export const DatePicker = () => {
    return (
        <div className='flex flex-col gap-5'>
            <DatePickerContainer title={'Default Picker'} node={<SinglePickerExample />} />
            <DatePickerContainer title={'Range Picker'} node={<RangePickerExample />} />
            <DatePickerContainer title={'Range Picker Compact'} node={<RangePickerCompactExample />} />
            <DatePickerContainer title={'Nested Range Picker'} node={<NestedRangePickerExample />} />
        </div>
    )
}
