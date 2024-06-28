import { useNavigation, type DropdownProps, useDayPicker } from 'react-day-picker'
import { setYear } from 'date-fns'
import { StyledFormControl } from 'src/shared-components/StyledFormControl'
import { StyledSelect } from 'src/shared-components/StyledSelect'
import { StyledSelectItem } from 'src/shared-components/StyledSelectItem'
import styles from './StyledCalendarPickerSelectPeriod.module.scss'
export const StyledCalendarPickerSelectYear: React.FC<DropdownProps> = (props) => {
    const { caption, children } = props
    const { goToMonth } = useNavigation()
    const { month } = useDayPicker()
    const monthsList = children as { key: number; props: { value: number; children: string } }[]

    const selectedOptions = monthsList?.map((month) => ({ id: month.props.value, label: month.props.children }))

    return (
        <StyledFormControl style={{ width: '70px', marginLeft: '5px' }}>
            <StyledSelect
                dataTest='StyledCalendarPickerSelectYear'
                size='small'
                variant='standard'
                value={caption}
                onChange={(e) => {
                    const selectedValue = e.target.value
                    const id = selectedOptions.find((opt) => opt.label === selectedValue)?.id
                    month && !isNaN(Number(id)) && goToMonth(setYear(month, Number(id)))
                }}
                MenuProps={{ className: styles['styled-calendar-picker-select-period-menu'] }}
            >
                {selectedOptions?.map((month) => (
                    <StyledSelectItem key={month.id} value={month.label}>
                        {month.label}
                    </StyledSelectItem>
                ))}
            </StyledSelect>
        </StyledFormControl>
    )
}
