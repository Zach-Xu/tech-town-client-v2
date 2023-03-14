export interface Tag {
    id: number
    tagName: string
    description: string | null
}

export interface AnswerVO {
    content: string
    user: UserVO
    id: number
    createdTime: string
}

interface UserVO {
    username: string
    email: string
    id: number
}

export interface QuestionDetailVO {
    id: number
    tags: Tag[]
    content: string
    title: string
    user: UserVO
    answers: AnswerVO[]
    upVotes: number
    downVotes: number
    views: number
    createdTime: string
}

