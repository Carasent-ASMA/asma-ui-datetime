import type { ReactNode } from 'react'

export const DatePickerContainer: React.FC<{ title: string; node: ReactNode }> = ({ title, node }) => {
    return (
        <div className='px-5 pb-6 pt-4 bg-gray-100 w-[500px]'>
            <h2 className='opacity-[0.7]'>{title}</h2>
            {node}
        </div>
    )
}
