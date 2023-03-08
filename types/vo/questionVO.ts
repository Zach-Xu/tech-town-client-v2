import { Tag } from "../dto/questionDTO"
import { UserVO } from "./userVO"

export interface QuestionVO {
    id: number
    title: string
    user: UserVO
    tags: Tag[]
    createdTime: Date
    numOfAnswers: number
}
