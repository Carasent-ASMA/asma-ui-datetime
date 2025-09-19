import { format } from 'date-fns'
import PopupState from 'material-ui-popup-state'
import { useEffect, useState, type ChangeEvent } from 'react'
import { ClickAwayListener } from '@mui/material'
import { bindTrigger } from 'material-ui-popup-state/hooks'
import { TimePickerPopper } from './TimePickerPopper'
import { getTimeFromValue } from './helpers/getTimeFromValue'
import { TimePickerInput } from './TimePickerInput'
import type { IPopupStateType, StyledTimePickerProps } from './types'

export const StyledTimePicker: React.FC<StyledTimePickerProps> = (props) => {
    const { value, onSelect } = props
    const [localValue, setLocalValue] = useState(value ? format(value, 'HH:mm') : '')
    const [isValidTime, setIsValidTime] = useState(true)

    useEffect(() => {
        setLocalValue(value ? format(value, 'HH:mm') : '')
    }, [value])

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, popupState: IPopupStateType) => {
        const nextValue = e.target.value

        setLocalValue(nextValue)
        if (nextValue.length === 5) {
            const validTime = getTimeFromValue(nextValue, value)

            if (validTime) {
                onSelect(validTime)
                popupState.close()
            } else {
                onSelect(undefined)
            }

            setIsValidTime(!!validTime)
        } else {
            setIsValidTime(false)
        }
    }

    const handleSelect = (selectedTime: Date | undefined /* , popupState?: IPopupStateType */) => {
        onSelect(selectedTime)
        setLocalValue(selectedTime ? format(selectedTime, 'HH:mm') : '')
        setIsValidTime(true)
    }

    const handleClear = () => {
        onSelect(undefined)
        setLocalValue('')
        setIsValidTime(true)
    }

    return (
        <PopupState variant='popper' popupId='time-picker-popper'>
            {(popupState) => {
                if (props.disabled || props.readOnly)
                    return (
                        <TimePickerInput
                            {...props}
                            popupState={popupState}
                            localValue={localValue}
                            isValidTime={isValidTime}
                            handleChange={(e) => handleChange(e, popupState)}
                        />
                    )

                return (
                    <ClickAwayListener mouseEvent='onMouseDown' onClickAway={() => popupState.close()}>
                        <div className='w-auto h-auto relative'>
                            <div
                                className='flex items-center justify-center h-fit m-0 p-0'
                                {...bindTrigger(popupState)}
                            >
                                <TimePickerInput
                                    {...props}
                                    popupState={popupState}
                                    localValue={localValue}
                                    isValidTime={isValidTime}
                                    handleChange={(e) => handleChange(e, popupState)}
                                />
                            </div>
                            {popupState.isOpen && (
                                <TimePickerPopper
                                    {...props}
                                    popupState={popupState}
                                    handleClear={handleClear}
                                    onSelect={(time) => handleSelect(time)}
                                />
                            )}
                        </div>
                    </ClickAwayListener>
                )
            }}
        </PopupState>
    )
}
