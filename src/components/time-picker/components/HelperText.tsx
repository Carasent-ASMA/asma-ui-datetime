import type { ReactNode } from "react"

export const HelperText: React.FC<{
    isValidTime: boolean
    error?: boolean
    localization: 'en' | 'no'
    helperText?: ReactNode
}> = ({ isValidTime, localization = 'en', helperText }) => {
    let helper = helperText

    const enString = 'Not valid'

    const noString = 'Ikke gyldig'

    if (!isValidTime) helper = localization === 'en' ? enString : noString

    return <span className='absolute'>{helper}</span>
}
