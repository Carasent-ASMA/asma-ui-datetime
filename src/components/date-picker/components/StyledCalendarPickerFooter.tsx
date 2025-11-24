import { useNavigation, type Matcher } from 'react-day-picker'
import { isDate } from 'date-fns'
import type { Dispatch, SetStateAction } from 'react'
import { compact, isArray, isObject } from 'lodash-es'

import { ChevronLeftIcon } from 'src/shared-components/ChevronLeftIcon'
import { ChevronRightIcon } from 'src/shared-components/ChevronRightIcon'
import { StyledButton } from 'src/shared-components/button'

export const StyledCalendarPickerFooter: React.FC<{
    onClose: ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined
    isNb: boolean
    selected: Matcher | Matcher[] | undefined
    removeSelection: (e: React.MouseEvent) => void
    onClear: (() => void) | undefined
    month: Date | undefined
    setMonth: Dispatch<SetStateAction<Date | undefined>>
}> = ({ onClose, isNb, selected, removeSelection, setMonth, onClear }) => {
    const { nextMonth, previousMonth } = useNavigation()

    const eraserDisabled = isArray(selected)
        ? !selected.length
        : isDate(selected)
        ? !selected
        : isObject(selected)
        ? !compact(Object.values(selected)).length
        : true

    return (
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <StyledButton
                dataTest=''
                variant='text'
                onClick={(e) => {
                    onClear ? onClear() : removeSelection(e)
                    // to reset picker navigation
                    setMonth(new Date(Date.now()))
                }}
                size='small'
                disabled={eraserDisabled}
                style={{ minWidth: '60px' }}
            >
                {isNb ? 'Nullstill' : 'Clear'}
            </StyledButton>
            <div className='rdp-custom-caption-navigation' style={{ display: 'flex', gap: 8 }}>
                <StyledButton
                    dataTest=''
                    variant='outlined'
                    size='small'
                    disabled={!previousMonth}
                    onClick={() => {
                        previousMonth && setMonth(previousMonth)
                    }}
                    style={{ minWidth: '25px' }}
                >
                    <ChevronLeftIcon width={20} height={20} />
                </StyledButton>
                <StyledButton
                    dataTest=''
                    size='small'
                    // disabled={month && isSameMonth(new Date(Date.now()), month)}
                    onClick={() => {
                        setMonth(new Date(Date.now()))
                    }}
                    variant='outlined'
                >
                    {isNb ? 'I dag' : 'Today'}
                </StyledButton>
                <StyledButton
                    dataTest=''
                    variant='outlined'
                    size='small'
                    disabled={!nextMonth}
                    onClick={() => {
                        nextMonth && setMonth(nextMonth)
                    }}
                    style={{ minWidth: '25px' }}
                >
                    <ChevronRightIcon width={20} height={20} />
                </StyledButton>
            </div>
            <StyledButton
                dataTest=''
                variant='contained'
                size='small'
                onClick={(e) => {
                    onClose?.(e, 'backdropClick')
                }}
                style={{ minWidth: '60px' }}
            >
                {isNb ? 'Velg' : 'Select'}
            </StyledButton>
        </div>
    )
}
