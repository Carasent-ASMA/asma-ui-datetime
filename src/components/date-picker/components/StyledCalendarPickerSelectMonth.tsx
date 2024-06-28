import { useNavigation, type DropdownProps, useDayPicker } from 'react-day-picker'
import { setMonth } from 'date-fns'
import { capitalize } from 'lodash-es'

import { StyledFormControl } from 'src/shared-components/StyledFormControl'
import { StyledSelect } from 'src/shared-components/StyledSelect'
import { StyledSelectItem } from 'src/shared-components/StyledSelectItem'
import styles from './StyledCalendarPickerSelectPeriod.module.scss'
export const StyledCalendarPickerSelectMonth: React.FC<DropdownProps> = (props) => {
    const { caption, children } = props
    const { goToMonth } = useNavigation()
    const { month } = useDayPicker()
    const monthsList = children as { key: number; props: { value: number; children: string } }[]

    const selectedOptions = monthsList?.map((month) => ({ id: month.props.value, label: month.props.children }))

    return (
        <StyledFormControl style={{ width: '105px', marginLeft: '-5px' }}>
            <StyledSelect
                dataTest='StyledCalendarPickerSelectMonth'
                size='small'
                variant='standard'
                value={caption}
                onChange={(e) => {
                    const selectedValue = e.target.value
                    const id = selectedOptions.find((opt) => opt.label === selectedValue)?.id
                    month && !isNaN(Number(id)) && goToMonth(setMonth(month, Number(id)))
                }}
                MenuProps={{ className: styles['styled-calendar-picker-select-period-menu'] }}
            >
                {selectedOptions?.map((month) => (
                    <StyledSelectItem key={month.id} value={month.label}>
                        {capitalize(month.label)}
                    </StyledSelectItem>
                ))}
            </StyledSelect>
        </StyledFormControl>
    )
}
