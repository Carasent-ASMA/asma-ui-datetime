import { useState } from 'react'

import { StyledCalendarPicker } from './components/StyledCalendarPicker'
import type { DatePickerProps } from './types'
import { setPickerPosition } from './helpers'
import { DatePickerInputIndex } from './components/DatePickerInputIndex'
import { useIsMobileView } from 'src/hooks/useWindowWidthSize.hook'
import { Drawer } from '@mui/material'
import { StyledDayPicker } from './components/StyledDayPicker'

export const StyledDatePicker = (props: DatePickerProps) => {
    const isMobile = useIsMobileView()
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
    const [positionAbove, setPositionAbove] = useState(false)

    const openDatePicker = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
        setPickerPosition(event, setPositionAbove)
    }

    const onClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <DatePickerInputIndex {...props} onClick={openDatePicker} />
            {!isMobile && (
                <StyledCalendarPicker
                    datePickerProps={{ ...props }}
                    popoverProps={{ open: !!anchorEl, anchorEl, onClose }}
                    positionAbove={positionAbove}
                />
            )}
            {isMobile && (
                <Drawer
                    anchor={'bottom'}
                    open={!!anchorEl}
                    onClose={onClose}
                    sx={{ zIndex: 1300 }}
                    className='z-[1300]'
                >
                    <div className='max-w-[360px] mx-auto'>
                        <StyledDayPicker
                            datePickerProps={{ ...props }}
                            popoverProps={{ open: !!anchorEl, anchorEl, onClose }}
                        />
                    </div>
                </Drawer>
            )}
        </>
    )
}
