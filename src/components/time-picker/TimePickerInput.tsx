import type { StyledTimePickerProps } from './types'
import { type PopupState } from 'material-ui-popup-state/hooks'
import { HelperText } from './components/HelperText'
import type { ChangeEvent } from 'react'
import { StyledInputField } from 'src/shared-components/StyledInputField'
import { ClockOutlineIcon } from 'src/shared-components/ClockOutlineIcon'
import { useMask } from '@react-input/mask'

export const TimePickerInput: React.FC<
    StyledTimePickerProps & {
        popupState: PopupState
        handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
        isValidTime: boolean
        localValue: string
    }
> = (props) => {
    const {
        placeholder,
        disabled,
        inputClassName,
        dataTest,
        width,
        error,
        helperText,
        label,
        locale = 'en',
        popupState,
        handleChange,
        isValidTime,
        localValue,
        title,
        readOnly,
    } = props

    const inputRef = useMask({
        mask: 'xx:xx',
        replacement: {
            x: /[0-9]/,
        },
        showMask: false,
    })

    return (
        <div>
            {title && <div className='pb-1 font-semibold font-roboto text-delta-800'>{title}</div>}
            <StyledInputField
                inputRef={inputRef}
                autoComplete='off'
                type='text'
                dataTest={dataTest}
                data-testid={dataTest}
                placeholder={placeholder}
                size='small'
                error={!isValidTime || error}
                helperText={
                    <HelperText isValidTime={isValidTime} error={error} localization={locale} helperText={helperText} />
                }
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <ClockOutlineIcon
                            width={24}
                            height={24}
                            onClick={() => !disabled && !readOnly && popupState.open()}
                        />
                    ),
                }}
                value={localValue}
                sx={{
                    height: readOnly ? 40 : 70,
                    maxWidth: width || 130,
                    width,
                    minWidth: width,
                }}
                disabled={disabled}
                readOnly={readOnly}
                className={inputClassName}
                label={label}
            />
        </div>
    )
}
