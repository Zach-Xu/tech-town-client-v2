import React from 'react'

type Props = {
    language: string
}

const RepoLanguageDot = ({ language }: Props) => {

    const colors: string[] = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500']

    const getColorByLanguage = (language: string): string => {

        return colors[language.length % (colors.length - 1)]
    }

    const bgColor = getColorByLanguage(language)

    return (
        <span className={`${bgColor} w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-full`}></span>
    )
}

export default RepoLanguageDot