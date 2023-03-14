import { VOTE_STATUS } from "../../lib/constants"

export interface QuestionDTO {
    title: string
    content: string
    tags: TagDTO[]
}

export interface VoteDTO {
    status: VOTE_STATUS
}

export interface TagDTO {
    tagName: string
    description: string | null
}

export interface AnswerDTO {
    content: string
}