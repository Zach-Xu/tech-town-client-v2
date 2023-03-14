import { Tag } from "./questionDetailVO"
import { UserVO } from "./userVO"

export interface QuestionVO {
    id: number
    title: string
    user: UserVO
    tags: Tag[]
    createdTime: string
    numOfAnswers: number
    votes: number
    views: number
}


export interface VoteVO {
    id: number
    user: {
        id: number
        username: string
    }
    question: {
        id: number
        title: string
        upVotes: number
        downVotes: number
    }
    status: number
}