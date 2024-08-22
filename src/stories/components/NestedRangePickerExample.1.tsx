import { RangePickerCompactExample } from './RangePickerCompactExample'
import { useToggleMenuVisibility } from 'src/hooks/useToggleMenuVisibility.hook'
import { Popover } from '@mui/material'
import { StyledButton } from 'src/shared-components/button'

export const NestedRangePickerExample: React.FC = () => {
    const { anchorEl, open, handleClose, handleOpen } = useToggleMenuVisibility()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleOpen(event)
    }

    return (
        <div className='pt-4'>
            <StyledButton dataTest='' variant='contained' onClick={handleClick}>
                Open
            </StyledButton>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 50,
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ padding: '5px' }}>
                    <RangePickerCompactExample />
                </div>
            </Popover>
        </div>
    )
}
