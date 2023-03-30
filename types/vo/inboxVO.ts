import { TYPE } from "../../lib/constants"
import { MessageVO } from "./messageVO"

export interface InboxVO {
    id: number
    participants: Participant[]
    lastMessage: Message | MessageVO
    type: TYPE
}

export interface Participant {
    id: number
    username: string
}

interface Message {
    id: number
    createdTime: string
    updatedTime: string
    sender: Participant
    receiver: Participant
    inbox: {
        id: number
    }
    content: string
}
