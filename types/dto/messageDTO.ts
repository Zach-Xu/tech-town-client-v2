import { TYPE } from "../../lib/constants"

export interface MessageDTO {
    receiverId: number
    content: string
    type: TYPE
}