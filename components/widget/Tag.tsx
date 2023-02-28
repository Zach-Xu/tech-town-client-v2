import React from 'react'

type Props = {
    tagName: string
}

const Tag = ({ tagName }: Props) => {
    return (
        <div className='bg-blue-100 text-blue-900 text-xs py-1 px-2 cursor-pointer'>{tagName}</div>
    )
}

export default Tag