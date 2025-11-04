import React from 'react'
import { StyledTooltip } from 'src/shared-components/StyledTooltip'

const MAX_CHARS = 50

export const HelperTextWithTooltip = ({ text }: { text: React.ReactNode }) => {
    if (typeof text !== 'string') return <>{text}</>

    const isTrimmed = text.length > MAX_CHARS
    const displayed = isTrimmed ? text.slice(0, MAX_CHARS) + '…' : text

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
            }}
        >
            {displayed}
        </span>
    )

    if (!isTrimmed) return content

    return (
        <StyledTooltip title={text} placement='right' arrow>
            <span>{content}</span>
        </StyledTooltip>
    )
}
