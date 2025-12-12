import React from 'react'
import { cn } from 'src/helpers/cn'
import { OutlineErrorRounded } from 'src/shared-components/OutlineErrorRounded'
import { StyledTooltip } from 'src/shared-components/StyledTooltip'

export const HelperTextWithTooltip = ({ text, hasError }: { text: React.ReactNode; hasError: boolean }) => {
    if (typeof text !== 'string') return <>{text}</>

    const maxLength = hasError ? 35 : 40
    const isTrimmed = text.length > maxLength
    const displayed = isTrimmed ? text.slice(0, maxLength) + '…' : text
    
    const content = (
        <span
            style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '16px',
                maxHeight: 32,
                wordBreak: 'break-word',
                fontFamily: 'roboto, sans-serif',
            }}
        >
            {displayed}
        </span>
    )

    const helper = (
        <div className='flex gap-1'>
            <div className={cn('flex', 'transform-gpu transition-all duration-300 ease-in-out')}>
                {hasError && <OutlineErrorRounded width={20} height={20} color='var(--colors-error-500)' />}
            </div>
            {content}
        </div>
    )

    if (!isTrimmed) return helper

    return (
        <StyledTooltip title={text} placement='right' arrow>
            <span>{helper}</span>
        </StyledTooltip>
    )
}
