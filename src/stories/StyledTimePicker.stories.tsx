import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { StyledTimePicker } from 'src/components/time-picker'

const meta = {
    title: '*/TimePicker',
    component: StyledTimePicker,
    tags: [],
    argTypes: {},
    args: {},
} satisfies Meta<typeof StyledTimePicker>

export default meta

export const TimePicker = () => {
    const [value, setValue] = useState<Date | undefined>()

    return (
        <div style={{ display: 'flex', width: '100%', gap: '16px' }}>
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
        </div>
    )
}
