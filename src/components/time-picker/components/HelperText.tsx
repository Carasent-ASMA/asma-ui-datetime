import clsx from 'clsx'
import type { ReactNode } from 'react'
import { OutlineErrorRounded } from 'src/shared-components/OutlineErrorRounded'

const enString = 'Invalid time format'

const noString = 'Ugyldig tidsformat'

export const HelperText: React.FC<{
    isValidTime: boolean
    error?: boolean
    localization: 'en' | 'no'
    helperText?: ReactNode
}> = ({ isValidTime, localization = 'en', error, helperText }) => {
    if (!isValidTime) helperText = localization === 'en' ? enString : noString

    return (
        <span className={clsx('flex items-center gap-1')}>
            {error && <OutlineErrorRounded width={20} height={20} />}
            {helperText}
        </span>
    )
}
