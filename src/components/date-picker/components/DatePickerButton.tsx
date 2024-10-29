import React from 'react'
import { StyledButton } from 'src/shared-components/button'
import { OutlineCalendarMonth } from 'src/shared-components/OutlineCalendarMonth'

interface DatePickerButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

export const DatePickerButton: React.FC<DatePickerButtonProps> = ({ onClick, disabled }) => {
    return (
        <StyledButton
            size='large'
            dataTest='DatePickerButton'
            startIcon={<OutlineCalendarMonth width={24} height={24} />}
            variant='outlined'
            onClick={(e) => !disabled && onClick(e)}
        />
    )
}
