import { useMask } from '@react-input/mask'

export const useDatePickerMask = () => {
    const maskRef = useMask({
        mask: '__/__/____',
        replacement: {
            _: /[0-9]/,
        },
        showMask: true,
    })

    return { maskRef }
}
