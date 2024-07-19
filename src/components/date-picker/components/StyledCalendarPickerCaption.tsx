import { type CaptionProps, Caption } from 'react-day-picker'

import { type Dispatch, type SetStateAction } from 'react'

export function CustomCaption(
    props: CaptionProps & {
        month: Date | undefined
        setMonth: Dispatch<SetStateAction<Date | undefined>>
        isNb: boolean
    },
) {
    const { month } = props

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
        </div>
    )
}
