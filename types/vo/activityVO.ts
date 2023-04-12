import { ACTION } from "../../lib/constants";

export interface ActivityVO {
    action: ACTION,
    createdTime: string
    id: number
    question: {
        id: number
        title: string
    }
    updatedTime: string
    userId: string
}