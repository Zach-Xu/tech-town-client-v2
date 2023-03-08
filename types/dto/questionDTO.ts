export interface QuestionDTO {
    id: number
    title: string
    content: string
    tags: Tag[]
}

export interface Tag {
    id: number
    tagName: string
    description: string | null
}

