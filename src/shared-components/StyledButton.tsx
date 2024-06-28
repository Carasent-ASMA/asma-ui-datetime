import { Button, type ButtonProps } from '@mui/material'
export const StyledButton = (props: ButtonProps) => (
    <Button
        {...props}
        sx={{
            textTransform: 'capitalize',
            '&.MuiButtonBase-root': {
                '&.MuiButton-root': {
                    '&.MuiButton-contained': {
                        backgroundColor: 'var(--colors-gama-500)',
                        '&:hover': {
                            backgroundColor: 'var(--colors-gama-700)',
                        },
                    },
                    '&.MuiButton-outlined': {
                        color: 'var(--colors-gray-500)',
                        borderColor: 'var(--colors-gama-500)',
                        '&:hover': {
                            backgroundColor: 'var(--colors-gama-50)',
                        },
                        '&:disabled': {
                            borderColor: 'var(--colors-gray-300)',
                            color: 'var(--colors-gray-300)',
                        },
                    },
                    '&.MuiButton-text': {
                        color: 'var(--colors-gama-500)',
                        '&:hover': {
                            backgroundColor: 'var(--colors-gama-50)',
                        },
                        '&:disabled': {
                            color: 'var(--colors-gray-300)',
                        },
                    },
                },
            },
        }}
    />
)
