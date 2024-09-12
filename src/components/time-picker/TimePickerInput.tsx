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
        name,
    } = props

    const inputRef = useMask({
        mask: 'xx:xx',
        replacement: {
            x: /[0-9]/,
        },
        showMask: false,
    })
    return (
        <StyledInputField
            inputRef={inputRef}
            name={name}
            autoComplete='off'
            type='text'
            dataTest={dataTest}
            placeholder={placeholder}
            size='small'
            error={!isValidTime || error}
            helperText={
                <HelperText isValidTime={isValidTime} error={error} localization={locale} helperText={helperText} />
            }
            onChange={handleChange}
            InputProps={{
                endAdornment: (
                    <ClockOutlineIcon width={24} height={24} onClick={() => !disabled && popupState.open()} />
                ),
            }}
            value={localValue}
            sx={{
                height: 40,
                maxWidth: width || 130,
                width,
                minWidth: width,
                '& .MuiFormControl-root': {
                    height: '40px', // Custom height for the FormControl
                },
                '& .MuiInputBase-root': {
                    height: '40px', // Custom height for the input element
                },
                '& .MuiOutlinedInput-root': {
                    height: '40px', // Ensure the outlined variant has the correct height
                },
            }}
            disabled={disabled}
            className={inputClassName}
            label={label}
        />
    )
}
