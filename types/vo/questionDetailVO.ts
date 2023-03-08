import { Tag } from "../dto/questionDTO"

interface Answer {
    content: string
    user: User
    id: number
}

interface User {
    username: string
    email: string
    id: number
}

export interface QuestionDetailVO {
    id: number
    tags: Tag[]
    content: string
    title: string
    user: User
    answers: Answer[]
    upVotes: number
    downVotes: number
    views: number
    createdTime: Date
}

