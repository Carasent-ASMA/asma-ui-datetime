import { type CaptionProps, Caption } from 'react-day-picker'

import { type Dispatch, type SetStateAction } from 'react'
import { StyledButton } from 'src/shared-components/button'
import { CloseIcon } from 'src/shared-components/CloseIcon'

export function CustomCaption(
    props: CaptionProps & {
        month: Date | undefined
        setMonth: Dispatch<SetStateAction<Date | undefined>>
        isNb: boolean
        onClose: ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined
    },
) {
    const { month, onClose } = props

    return (
        <div
            className='rdp-custom-caption capitalize'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: '10px',
            }}
        >
            {month && <Caption displayMonth={month} />}
            <StyledButton
                dataTest='close-button'
                variant='textGray'
                onClick={(e) => onClose?.(e, 'backdropClick')}
                startIcon={<CloseIcon height={20} width={20} />}
            />
        </div>
    )
}
