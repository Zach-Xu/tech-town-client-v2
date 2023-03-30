import { Participant } from "./inboxVO"

export interface MessageVO {
    id: number
    createdTime?: string
    updatedTime?: string
    sender: Participant
    receiver: Participant
    inbox: {
        id: number
    }
    content: string
}